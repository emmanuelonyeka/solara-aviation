import LegalDocument from '../components/legal/LegalDocument';
import { privacy } from '../data/legal';

export default function Privacy() {
  return <LegalDocument doc={privacy} image="/images/legal/privacy-manifest.webp" />;
}
