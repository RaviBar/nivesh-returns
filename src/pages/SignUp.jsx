import RegisterForm from '../components/auth/RegisterForm';
import Footer from '../components/Footer';

const SignUp = () => (
  <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
    <main className="flex-1 flex items-center justify-center py-16 mb-24">
      <RegisterForm />
    </main>
    <Footer paddingTop="pt-[10px]" paddingTopMd="md:pt-[60px]" />
  </div>
);

export default SignUp;