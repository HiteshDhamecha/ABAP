import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Metadata, RunView, LogStatus, RunQuery } from '@memberjunction/core';

interface AbstractDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string;
  jobTitle: string;
  phoneNumber: string;
  socialLinks: string;
  summary: string;
  speakingExperiences: {
    title: string;
    description: string;
  }[];
}

@Component({
  selector: 'app-manage-abstract-details',
  templateUrl: './manage-abstract-details.component.html',
  styleUrls: ['./manage-abstract-details.component.css']
})
export class ManageAbstractDetailsComponent implements OnInit {
  abstractDetails: AbstractDetails | undefined;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      let speakerName = params.get('speaker');
      console.log("🔹 Speaker Name from URL:", speakerName);

      if (speakerName) {
        // Decode and remove duplicates
        let decodedSpeakerName = decodeURIComponent(speakerName).trim();
        let cleanedSpeakerName = [...new Set(decodedSpeakerName.split(' '))].join(' ');

        console.log("Decoded Speaker Name (Cleaned):", cleanedSpeakerName);

        await this.loadAbstractDetails(cleanedSpeakerName);
      }
    });
  }

  async loadAbstractDetails(speakerName: string) {
    try {
      console.log("Fetching Abstract Details...");
      const rv = new RunQuery();
            const result = await rv.RunQuery({
              QueryID: 'D1E2F3A4-B5C6-7890-1234-56789ABCDEF1',
              QueryName: 'Abstract Details Query'
            });
      

      console.log("API Response:", result);

      if (result.Success) {
        // Debugging: Log each record in API response
        result.Results.forEach((item: any) => {
          console.log(`Checking: ${item.FirstName} ${item.LastName} | ${item.Email}`);
        });

        // Find a matching abstract
        const matchingAbstract = result.Results.find(
          (item: any) => 
            item?.FirstName?.trim().toLowerCase() === speakerName.toLowerCase() || 
            item?.LastName?.trim().toLowerCase() === speakerName.toLowerCase() || 
            item?.Email?.trim().toLowerCase() === speakerName.toLowerCase() ||
            `${item?.FirstName} ${item?.LastName}`.trim().toLowerCase() === speakerName.toLowerCase()
        );

        console.log("Matching Abstract:", matchingAbstract);

        if (matchingAbstract) {
          const parsedDetails = this.parseAbstractText(matchingAbstract.AbstractText);
          console.log("🔹 Parsed Details:", parsedDetails);

          this.abstractDetails = {
            id: matchingAbstract.AbstractID || '',
            firstName: matchingAbstract.FirstName || '',
            lastName: matchingAbstract.LastName || '',
            email: matchingAbstract.Email || '',
            affiliation: matchingAbstract.Affiliation || '-',
            jobTitle: matchingAbstract.JobTitle || '-',
            phoneNumber: matchingAbstract.PhoneNumber || '-',
            socialLinks: matchingAbstract.SocialMediaLinks || '-',
            summary: parsedDetails.summary || 'No summary available.',
            speakingExperiences: parsedDetails.speakingExperiences
          };

          console.log("Abstract Details Set:", this.abstractDetails);
        } else {
          console.log("No matching abstract found for speaker:", speakerName);
        }
      } else {
        console.log(" API Call Failed.");
      }
    } catch (error) {
      console.error("Error fetching abstract details:", error);
    }
  }

  parseAbstractText(abstractText: string) {
    if (!abstractText) {
        return { summary: 'No summary available.', speakingExperiences: [] };
    }

    console.log("Raw Abstract Text:", abstractText);

    // Ensure different formatting variations are handled
    const sections = abstractText.split(/Previous Speaking Experiences\s*[-–]?/i);
    
    const summary = sections[0]?.trim() || '';

    const speakingExperiences: { title: string; description: string }[] = [];

    if (sections.length > 1) {
        // Extract experiences based on numbered points
        const experienceEntries = sections[1]
            .split(/\n\d+\.\s+/) // Split numbered list (e.g., "1. ", "2. ")
            .map(exp => exp.trim())
            .filter(exp => exp.length > 0);

        experienceEntries.forEach(exp => {
            const firstLineEndIndex = exp.indexOf('\n');
            if (firstLineEndIndex !== -1) {
                const title = exp.substring(0, firstLineEndIndex).trim();
                const description = exp.substring(firstLineEndIndex + 1).trim();
                speakingExperiences.push({ title, description });
            } else {
                speakingExperiences.push({ title: exp, description: '' });
            }
        });
    }

    console.log("🔹 Parsed Summary:", summary);
    console.log("🔹 Parsed Speaking Experiences:", speakingExperiences);

    return { summary, speakingExperiences };
}


}
