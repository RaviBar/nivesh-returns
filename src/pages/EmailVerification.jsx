import EmailVerification from '../components/auth/EmailVerification';
import Footer from '../components/Footer';

const EmailVerificationPage = () => (
  <>
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <EmailVerification />
    </div>
    <Footer paddingTop="pt-[10px]" paddingTopMd="md:pt-[60px]" />
  </>
);

export default EmailVerificationPage;