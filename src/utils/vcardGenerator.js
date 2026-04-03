import { profile, contacts } from '../data/profile';

/**
 * Generates and triggers a download of a .vcf file for Ravi Kumar
 */
export function generateVCardString() {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:Tenneti;Ravi;Kumar;;`,
    `FN:${profile.name}`,
    `TITLE:${profile.title}`,
    `ORG:${profile.company}`,
    `TEL;TYPE=WORK,VOICE:${contacts.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${contacts.email}`,
    `URL:${contacts.website}`,
    'END:VCARD'
  ].join('\n');
}

/**
 * Generates and triggers a download of a .vcf file for Ravi Kumar
 */
export function downloadVCard() {
  const vcardString = generateVCardString();
  const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Ravi_Kumar_Tenneti.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
