import { Button } from "./AllButtons";

const PageHeader = ({ heading, btnText = "View All", onClick }) => {
  return (
    <div className="flex justify-between items-center py-2 px-3 sm:px-9 gap-2 mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-orange-600 drop-shadow shadow-gray-500">
        {heading}
      </h2>
      <Button title={btnText} onClick={onClick} />
    </div>
  );
};

export default PageHeader;
