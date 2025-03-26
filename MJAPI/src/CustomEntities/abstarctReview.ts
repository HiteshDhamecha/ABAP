import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import * as nodemailer from "nodemailer";
import { LogStatus, Metadata, RunView, RunViewResult, UserInfo } from "@memberjunction/core";
import { AbstractResultEntity, AbstractStatusEntity, ReviewCriteriaEntity, ScoreBoardEntity, SessionEntity, SessionScoreBoardEntity } from "mj_generatedentities";
import { sendEmail } from "./utility/sendEmail";


// Initialize OpenAI model
const model = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-4",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Function to review and score abstract
async function reviewAbstract(abstractText: string, criteria: { name: string, weight: number }[], promptTemplate: string, sessionTitle: string, weightedScore: number): Promise<{ score: number, reviewComments: string }> {
  // Construct the prompt dynamically based on criteria
  const criteriaText = criteria.map((c, index) => `${index + 1}. ${c.name} (${c.weight}%)`).join('\n');
  const scoresText = criteria.map(c => `"${c.name}": <number>`).join(',\n');
  const feedbackText = criteria.map(c => `"${c.name}": "<string>"`).join(',\n');

  const promptTemplateWithCriteria = promptTemplate
    .replace("{criteria}", criteriaText)
    .replace("{scores}", scoresText)
    .replace("{sessionTitle}", sessionTitle)
    .replace("{feedback}", feedbackText);

  const prompt = new PromptTemplate({
    template: promptTemplateWithCriteria,
    inputVariables: ["abstract"],
  });

  const formattedPrompt = await prompt.format({ abstract: abstractText });
  const response = await model.invoke(formattedPrompt);
  console.log("Response is:", response);
  const scores = typeof response.content === "string" ? JSON.parse(response.content) : response.content;
  console.log("Review Comments" ,scores["Review Comments"]);
  console.log("FeedBack..." ,scores.feedback["Completeness"]);
  
  let totalScore = 0;
  // Calculate weighted score
  criteria.forEach((c) => {
    totalScore += Number(scores.scores[c.name] || 0) * Number(c.weight);
  });

   console.log("###############################################################");
  console.log("Weighted Score of a Abstarct:", totalScore);
  console.log("Review Comments for a Abstarct : ", scores["Review Comments"]);
  console.log("###############################################################");

  const reviewComments = scores["Review Comments"] || "No review comments provided";
  return { score: totalScore, reviewComments };
}

export async function getCritearea(sessionId: string, user: UserInfo): Promise<{ name: string, weight: number }[] | null> {
  try {
    const rv = new RunView();

    const sessionScoreBoard:RunViewResult<SessionScoreBoardEntity> = await rv.RunView<SessionScoreBoardEntity>({
      EntityName: 'Session Score Boards',
      Fields: ['ScoreBoardId'],
      ExtraFilter: `SessionId = '${sessionId}'`
    }, user);

    if (sessionScoreBoard.Success && sessionScoreBoard.Results.length > 0) {
     
      const result: RunViewResult<ReviewCriteriaEntity> = await rv.RunView<ReviewCriteriaEntity>({
        EntityName: 'Review Criterias',
        Fields: ['Name', 'Weightage'],
        ExtraFilter: `ScoreBoardID = '${sessionScoreBoard.Results[0].ScoreBoardId}'`
      }, user);

      if (!result.Success || result.Results.length === 0) {
        return null;
      }

      // Map results to criteria format
      const criteria = result.Results.map((item) => ({
        name: item.Name,
        weight: item.Weightage || 0,
      }));

      return criteria;
    }
    return null;
  } catch (error) {
    LogStatus(error);
    return null;
  }
}

// Function to send email
async function sendEmailNodeMailer(recipient: string, subject: string, body: string) {

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,  // Make sure this is NOT '127.0.0.1'
    port: 587,                   // Use 587 for TLS
    secure: false,               // Must be false for Outlook
    auth: {
        user: process.env.EMAIL_USER,  // Outlook email
        pass: process.env.EMAIL_PASS // Outlook password or App Password
    },
    tls: {
        ciphers: 'SSLv3',  // Important for Office 365
        rejectUnauthorized: false 
    }
});

  // const transporter = nodemailer.createTransport({
  //   service: process.env.EMAIL_HOST,
  //   secure
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject,
    text: body,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email Sent to", recipient);
}

// Main function to handle abstract review
export async function processAbstract(abstractText: string, sessionID: string, user: UserInfo,abstarctId:string) {
  const criteria = await getCritearea(sessionID, user);
  if (!criteria) {
    console.error("Failed to retrieve criteria");
    return false;
  }

  const promptTemplate = await getPromptTemplate(user,sessionID,0);
  if (!promptTemplate) {
    console.error("Failed to retrieve prompt template");
    return false;
  }

  const sessionDetails = await getScoreDetails(user, sessionID);
  if (!sessionDetails) {
    console.error("Failed to retrieve session details");
    return false;
  }

  const { title: sessionTitle, weightedScore } = sessionDetails;

  const score = await reviewAbstract(abstractText, criteria, promptTemplate,sessionTitle,weightedScore);
  const recipientEmail: string = user.Email;


  if (score.score > weightedScore) {
    saveAbstractResult(user,abstarctId,score.score,await getStatuses("Selected",user),score.reviewComments);
    console.log("Passed Review with Score:", score);
    await sendEmail(
      recipientEmail,
      "Abstract Submission Review Passed",
      "Your abstract passed the review and is under further evaluation."
    );
  } else {
    saveAbstractResult(user,abstarctId,score.score,await getStatuses("Rejected",user),score.reviewComments);
    console.log("Rejected Review with Score:", score);
    await sendEmail(
      recipientEmail,
      "Abstract Submission Rejected",
      "Your abstract did not meet the required criteria."
    );
  }

  return true;
}

 async function getPromptTemplate(user: UserInfo,sessionID:string,rank:number): Promise<string | null> {
  try {
    const rv = new RunView();
    const result: RunViewResult<SessionEntity> = await rv.RunView<SessionEntity>({
      EntityName: 'Sessions',
      ExtraFilter: `ID = '${sessionID}'`,
      Fields: ['UserPrompt','UserPrompt1']
    }, user);

    if (!result.Success || result.Results.length === 0) {
      return null;
    }
if(rank==1){
  return result.Results[0].UserPrompt1;
}
  else{ 
    return result.Results[0].UserPrompt;  
  }
  } catch (error) {
    LogStatus(error);
    return null;
  }
}

async function getScoreDetails(user: UserInfo, sessionID: string): Promise<{ title: string, weightedScore: number } | null> {
  try {
    const rv = new RunView();
    const result: RunViewResult<SessionEntity> = await rv.RunView<SessionEntity>({
      EntityName: 'Sessions',
      ExtraFilter: `ID = '${sessionID}'`,
      Fields: ['Title', 'WeightedScore']
    }, user);

    if (!result.Success || result.Results.length === 0) {
      return null;
    }

    // Return Session SCoreBoard

    const sessionScoreResult: RunViewResult<SessionScoreBoardEntity> = await rv.RunView<SessionScoreBoardEntity>({
      EntityName: 'Session Score Boards',
      ExtraFilter: `SessionId = '${sessionID}'`,
      Fields: ['ScoreBoardId']
    }, user);

    if (!sessionScoreResult.Success || sessionScoreResult.Results.length === 0) {
      return null;
    }else{
      console.log("Session Score Board",sessionScoreResult.Results[0].ScoreBoardId);

      const ScoreBoardResult: RunViewResult<ScoreBoardEntity> = await rv.RunView<ScoreBoardEntity>({
        EntityName: 'Score Boards',
        ExtraFilter: `ID = '${sessionScoreResult.Results[0].ScoreBoardId}'`,
        Fields: ['CutOffScore']
      }, user);

      if (!ScoreBoardResult.Success || ScoreBoardResult.Results.length === 0) {
        return null;
      }
      return {
        title: result.Results[0].Title,
        weightedScore: ScoreBoardResult.Results[0].CutOffScore
      };
    }
  } catch (error) {
    LogStatus(error);
    return null;
  }
}

// Function to get cut-off score from AI agent
export async function getCutOffScore(user: UserInfo,sessionID:string, sessionTitle: string, criteria: { name: string, weight: number }[]): Promise<{ cutOffScore: number, reasoning: string }> {
  const criteriaText = criteria.map((c, index) => `${index + 1}. ${c.name} (${c.weight}%)`).join('\n');
  

  const prompt = await getPromptTemplate(user,sessionID,1);
  if (!prompt) {
    console.error("Failed to retrieve prompt template");
    return { cutOffScore: 0, reasoning: "Failed to retrieve prompt template" };
  }

  const promptTemplateWithCriteria = prompt
  .replace("{criteriaText}", criteriaText)
  .replace("{sessionTitle}", sessionTitle);

  const response = await model.invoke(promptTemplateWithCriteria);
  console.log("Cut-Off Score Response:", response);

  let cutOffScore;
  let reasoning;
  try {
    const responseContent = typeof response.content === "string" ? response.content : JSON.stringify(response.content);
    const cutOffScoreMatch = responseContent.match(/Cut-off Score:\s*(\d+)/);
    const reasoningMatch = responseContent.match(/Reasoning:\s*([\s\S]*)/);

    if (cutOffScoreMatch && cutOffScoreMatch[1]) {
      cutOffScore = parseFloat(cutOffScoreMatch[1]);
    } else {
      throw new Error("Cut-off score not found in response");
    }

    if (reasoningMatch && reasoningMatch[1]) {
      reasoning = reasoningMatch[1].trim();
    } else {
      throw new Error("Reasoning not found in response");
    }
  } catch (error) {
    console.error("Error parsing cut-off score and reasoning:", error);
    return { cutOffScore: 0, reasoning: "Error parsing response" };
  }

  console.log("Cut-Off Score:", cutOffScore);
  console.log("Reasoning:", reasoning);
  return { cutOffScore, reasoning };
}

async function getStatuses(filter: string, user: UserInfo): Promise<string | null> {
  try {
    const rv = new RunView();
    const result: RunViewResult<AbstractStatusEntity> = await rv.RunView<AbstractStatusEntity>({
      EntityName: 'Abstract Status',
      Fields: ['ID'],
      ExtraFilter: `Name = '${filter}'`,
    }, user);

    if (!result.Success || result.Results.length === 0) {
      return null;
    }
    return result.Results[0].ID
  } catch (error) {
    LogStatus(error);
    return null;
  }
}

async function saveAbstractResult(user:UserInfo,abstractID: string, score: number, statusId: string, reviewComments: string): Promise<boolean> {
  try {
          let abstractResult: AbstractResultEntity; 
          const md  = new Metadata();

          abstractResult = await md.GetEntityObject<AbstractResultEntity>('Abstract Results',user);    
          abstractResult.AbstractID=abstractID
          abstractResult.Score=score;
          abstractResult.AbstractStatusId=statusId;
          abstractResult.ReviewComments=reviewComments;

          const result = await abstractResult.Save();
          if (result) {  
            console.log('Abstract Result saved successfully');
          }
          else {
            console.log('Error saving Abstarct Result... ', abstractResult.LatestResult)
          }
          return result;
  } catch (error) {
      LogStatus(error,);
    return false;
  }
}

export async function getSessionDetails(user: UserInfo, scoreBoradID: string): Promise<{ title: string, ID: string } | null> {
  try {
    // Return Session SCoreBoard
    const rv = new RunView();
    const sessionScoreResult: RunViewResult<SessionScoreBoardEntity> = await rv.RunView<SessionScoreBoardEntity>({
      EntityName: 'Session Score Boards',
      ExtraFilter: `ScoreBoardId = '${scoreBoradID}'`,
      Fields: ['SessionId']
    }, user);

    if (!sessionScoreResult.Success || sessionScoreResult.Results.length === 0) {
      return null;
    }else{
      console.log("Session Score Board",sessionScoreResult.Results[0].SessionId);

      const result: RunViewResult<SessionEntity> = await rv.RunView<SessionEntity>({
        EntityName: 'Sessions',
        ExtraFilter: `ID = '${sessionScoreResult.Results[0].SessionId}'`,
        Fields: ['ID', 'Title']
      }, user);
  
      if (!result.Success || result.Results.length === 0) {
        return null;
      }

      return {
        title: result.Results[0].Title,
        ID: result.Results[0].ID
      };
    }
  } catch (error) {
    LogStatus(error);
    return null;
  }
}
// Example Usage
// const sampleAbstract = "This is an example research abstract on AI's psychological effects.";
// const recipientEmail = "applicant@example.com";
// const sessionID = "example-session-id";
// const user = { Email: "user@example.com" }; // Replace with actual user info

// processAbstract(sampleAbstract, recipientEmail, sessionID, user);