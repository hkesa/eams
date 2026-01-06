import { FormData } from '../types';

// NOTE: You must replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

export const submitToGoogleSheet = async (data: FormData): Promise<boolean> => {
  try {
    // In a real scenario, this would post to the script
    // const response = await fetch(GOOGLE_SCRIPT_URL, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   mode: 'no-cors' // Often needed for Google Scripts
    // });
    
    // Simulating API call for now
    console.log("Submitting data to Google Sheet:", data);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheet", error);
    return false;
  }
};