export const PROMPTS = {
    REVIEW: `You are an expert research evaluator. Assess the abstract based on:

{criteria}

**Task:**
- Assign a **1-10 score** for each category.
- Provide feedback for each category.
- Check the relevance of the abstract to the session title: "{sessionTitle}".
-  Additionally, provide your reasoning or "thinking" behind the score.
- **Ensure the response is in valid JSON format, without markdown or code blocks.**

**Abstract:**  
{abstract}

**Respond in raw JSON (no formatting):**
{{
  "scores": {{
    {scores}
  }},
  "feedback": {{
    {feedback}
  }},
  "Review Comments": "<string>"
}}
`,
    CUTOFF_SCORE: `You are an expert research evaluator. Based on the following session title and criteria, determinse a cut-off score for selecting abstracts:

    Session Title: {sessionTitle}
    Criteria:
    {criteriaText}

    Provide the cut-off score as a single number.
	Maximum score is approx 1000
	Maximum score for each category is 10
    Additionally, provide your reasoning or "thinking" behind the cut-off score.`,
};