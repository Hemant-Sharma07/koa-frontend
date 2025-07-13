import { Button } from "./AllButtons";

const PageHeader = ({ heading, btnText = "View All" }) => {
  return (
    <div className="flex justify-between items-center py-2 px-5 sm:px-10 gap-2 mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-orange-600 drop-shadow shadow-gray-500">
        {heading}
      </h2>
      <Button title={btnText} />
    </div>
  );
};

export default PageHeader;
