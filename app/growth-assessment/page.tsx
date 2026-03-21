import type { Metadata } from 'next';
import { AssessmentExperience } from '../../components/growth-assessment/assessment-experience';

export const metadata: Metadata = {
  title: 'Growth Assessment | Bourque Solutions',
  description:
    'Identify where your business is losing time and get one practical AI system recommendation with funding context.',
};

export default function GrowthAssessmentPage() {
  return <AssessmentExperience />;
}
