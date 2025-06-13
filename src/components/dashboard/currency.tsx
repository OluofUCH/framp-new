
import Image from 'next/image';

const Currency = () =>{

    
  const logo12 = "/images/coin.svg";
  const logo13 = "/images/coin2.svg";
  const logo133 = "/images/coin3.svg";

    const currencies = [
        { id: 1, name: 'USDT', amount: 1024, change: 'up', logo: logo133, per: "0.01%" },
        { id: 2, name: 'USDC', amount: 1.0587, change: 'down', logo: logo12, per: "0.01%" },
        { id: 3, name: 'USD', amount: 1.12, change: 'up', logo: logo13, per: "0.01%" }
      ];


    return(
        <>
                  <div className="flex gap-3 overflow-x-auto pb-2 mb-3">
                    {currencies.map(currency => (
                      <div key={currency.id} className=" flex flex-col bg-[#E3E2F5] dark:bg-[#E3E2F5] border-box rounded-xl p-2 py-0  w-1/3 h-[56px] shadow-sm">
                        <div className="flex gap-2 items-center mt-2">
                          <span className="text-gray-900 text-[14px] dark:text-black font-bold">{currency.name}</span>
                          <span className={`text-[10px] ${currency.change === 'up' ? 'text-green-500' : 'text-red-500'} flex gap-2`}>
                            {currency.per}
                            {currency.change === 'up' ? ' ↑' : ' ↓'}  
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-bold text-[10px] text-gray-900 dark:text-black">$ {currency.amount}</p>
                          <Image 
                            src={currency.logo} 
                            alt="Framp" 
                            width={14} 
                            height={14}
                            className="h-[20px] w-auto"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  </>
    );
}

export default Currency;