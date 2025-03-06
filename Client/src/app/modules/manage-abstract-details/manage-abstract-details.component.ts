import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface AbstractDetails {
  id: number;
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
  abstractList: AbstractDetails[] = [
    {
      id: 1,
      firstName: 'Tyler',
      lastName: 'Durden',
      email: 'tylerdurden@gmail.com',
      affiliation: 'IBM Software',
      jobTitle: 'Solution Architect',
      phoneNumber: '+91 9876543210',
      socialLinks: '+91 9876543210',
      summary: `I am a dynamic and thought-provoking speaker with a passion for challenging conventional thinking and inspiring transformative change...`,
      speakingExperiences: [
        {
          title: 'Disruptive Leadership Summit (2024)',
          description: 'Keynote: “Breaking the Mold: Leading with Chaos and Creativity” At this summit, I explored how leaders can embrace unpredictability, challenge norms, and foster innovation by thinking outside the traditional corporate structure. The session sparked deep discussions on redefining success in today’s fast-changing world'
        },
        {
          title: 'The Rebellion Conference (2023)',
          description: 'Panel Discussion: "Unlearning the Rules: A New Approach to Personal Growth"'
        },
        {
          title: 'Mindset Shift Workshop (2023)',
          description: 'Workshop: "From Fear to Freedom: Rewiring the Mind for Radical Change"'
        }
      ]
    },
    {
      id: 2, 
      firstName: 'Chandler',
      lastName: 'Bing',
      email: 'johndoe@example.com',
      affiliation: 'Google',
      jobTitle: 'AI Researcher',
      phoneNumber: '+1 123 456 7890',
      socialLinks: '@johndoe',
      summary: `An AI expert focused on ethics, fairness, and the future of machine learning...`,
      speakingExperiences: [
        {
          title: 'AI Ethics Summit (2024)',
          description: 'Keynote: "Balancing Innovation and Responsibility in AI"'
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const speakerName = params.get('speaker');
      if (speakerName) {
        const decodedSpeakerName = decodeURIComponent(speakerName);
        this.abstractDetails = this.abstractList.find(
          abstract => `${abstract.firstName} ${abstract.lastName}` === decodedSpeakerName
        );
      }  
    });
  }
}
