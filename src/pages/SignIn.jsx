import LoginForm from '../components/auth/LoginForm';
import Footer from '../components/Footer';

const SignIn = () => (
  <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
    <main className="flex-1 flex items-center justify-center py-16 mb-24">
        <LoginForm />
    </main>
    <Footer paddingTop="pt-[10px]" paddingTopMd="md:pt-[60px]" />
  </div>
);

export default SignIn;