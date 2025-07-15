// This is file with demos of your component
// Each export is one usecase for your component

import { MagicTextReveal } from "@/components/ui/magic-text-reveal";

const DemoOne = () => {
  return <MagicTextReveal />;
};

const DemoTwo = () => {
  return (
    <MagicTextReveal 
      text="SoluSix"
      color="rgb(16, 242, 127)"
      fontSize={60}
      spread={30}
      speed={0.8}
      density={3}
    />
  );
};

const DemoThree = () => {
  return (
    <MagicTextReveal 
      text="Magic"
      color="rgba(255, 255, 255, 0.9)"
      fontSize={80}
      fontFamily="Inter, sans-serif"
      fontWeight={700}
      spread={50}
      speed={0.3}
      density={2}
      className="mx-auto"
    />
  );
};

const DemoFour = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <MagicTextReveal 
        text="Hover Me"
        color="rgb(59, 130, 246)"
        fontSize={40}
        spread={25}
        speed={0.6}
      />
      <MagicTextReveal 
        text="Magic Text"
        color="rgb(236, 72, 153)"
        fontSize={40}
        spread={25}
        speed={0.6}
      />
    </div>
  );
};

export { DemoOne, DemoTwo, DemoThree, DemoFour }; 