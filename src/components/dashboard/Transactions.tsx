
 const Transaction =  ()  => {

    const transactions = [
        {
          id: 1,
          title: 'Flight',
          date: '27th May 2023, 5:23pm',
          amount: -216,
          icon: '✈️'
        },
        {
          id: 2,
          title: 'Netflix',
          date: '24th May 2023, 2:12pm',
          amount: -6.7,
          icon: 'N'
        },
        {
          id: 3,
          title: 'Received',
          date: '24th May 2023, 1:17pm',
          amount: 23456,
          icon: '↓'
        },
        {
          id: 4,
          title: 'Spotify',
          date: '21st May 2023, 9:51pm',
          amount: -2.2,
          icon: '🎵'
        },
        {
          id: 5,
          title: 'Sent',
          date: '21st May 2023, 11:45pm',
          amount: -2100,
          icon: '↑'
        }
      ];
     return(

      <main className="px-2">
          <div className="flex justify-between items-center mb-4 px-4">
            <h2 className="font-semibold text-gray-900 dark:text-white">Transactions</h2>
            <button className="text-sm text-purple-600 dark:text-purple-400">See all</button>
          </div>
          <div className="space-y-4 overflow-y-scroll mb-[50px]">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between px-4 rounded-xl shadow-sm transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#E3E2F5] text-black dark:bg-[#E3E2F5] flex items-center justify-center">
                    {transaction.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{transaction.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.amount > 0 
                    ? 'text-green-500 dark:text-green-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  ${Math.abs(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </main>
);
 }
 export default Transaction;