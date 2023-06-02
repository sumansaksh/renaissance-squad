function Tabs({ tabTracker, setTabTracker, tabsArr }) {
  console.log(tabTracker, "tabTracker");
  console.log(tabsArr, "tabsArr");
  const ActiveTabCSS =
    "inline-block px-4 py-3 text-blue-500 bg-white rounded-lg active";
  const NotActiveTabCSS =
    "inline-block px-4 py-3 rounded-lg text-black  dark:hover:bg-gray-800 dark:hover:text-white";
  return (
    <>
      <ul className="flex flex-wrap max-w-max p-1 rounded-md bg-gray-100 text-sm font-medium text-center text-gray-500  dark:text-gray-400">
        {tabsArr?.map((tab, index) => {
          return (
            <li
              className={`${index !== tabsArr.length - 1 ? "mr-2" : ""}`}
              onClick={() => {
                setTabTracker(tab);
              }}
            >
              <p
                className={`${
                  tabTracker === tab ? ActiveTabCSS : NotActiveTabCSS
                }`}
              >
                {tab}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Tabs;
