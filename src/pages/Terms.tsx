import LegalDocument from '../components/legal/LegalDocument';
import { terms } from '../data/legal';

export default function Terms() {
  return <LegalDocument doc={terms} image="/images/legal/terms-contract.webp" />;
}
