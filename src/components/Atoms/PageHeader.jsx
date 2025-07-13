import { Button } from "./AllButtons";

const PageHeader = ({ heading, btnText = "View All" }) => {
  return (
    <div className="flex justify-between items-center py-2 px-4 gap-2 mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold">{heading}</h2>
      <Button title={btnText} bgColor="#10b981" textColor="#000000" />
    </div>
  );
};

export default PageHeader;
