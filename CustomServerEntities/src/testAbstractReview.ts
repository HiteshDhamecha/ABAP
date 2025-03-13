import { userInfo } from 'os';
import { processAbstract } from './abstarctReview';
import { UserInfo } from '@memberjunction/core';

const sampleAbstract = `
This study explores the psychological effects of artificial intelligence on society.
It examines how AI influences human behavior, decision-making, and emotional well-being.
The research aims to provide insights into the positive and negative impacts of AI on mental health.
`;

async function testReviewAbstract() {
  try {
    let user:UserInfo;
    const reviewResult = await processAbstract(sampleAbstract,''/*SessionID*/,user,''/*AbstractID*/);
    console.log('Review Result:', reviewResult);
  } catch (error) {
    console.error('Error during abstract review:', error);
  }
}

testReviewAbstract();