import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar4 from './Navbar4';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

function PayButton() {
	const { connection } = useConnection();
    const { publicKey, sendTransaction, wallet } = useWallet();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleClick = () => {
	    setIsButtonDisabled(false);
	};

	return (
		<div className="bg-dark text-white" id="payDiv">

			<section>
				<div className="container-fluid p-0">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-2 col-lg-3 col-xl-4"></div>
						<div className="col-12 col-sm-8 col-lg-6 col-xl-4">
							<div className="mt-2 text-white text-center">
								<div className="containerWithoutScrollbar" style={{ margin: 0 }}>
            						<WalletMultiButton />
        						</div>
        				
        						<div className="mt-4 text-center">
								  	{wallet && publicKey ? (
								        <>
								            <p>Your wallet address: {publicKey && publicKey.toString()}</p>
								            <Link
								             	to="/v1/payments"
								             	className="btn p-2"
								             	style={{ color: 'white', backgroundColor: 'red', fontWeight: '900' }}
								             	onClick={handleClick}
								            >
								             	CONTINUE
								            </Link>
								        </>
						         	) : (
							            <button className="btn p-2" style={{ color: 'white', backgroundColor: 'grey', fontWeight: '900' }} disabled>
							              CONTINUE
							            </button>
							        )}
        					    </div>
        					 </div>
						</div>
						<div className="col-12 col-sm-2 col-lg-3 col-xl-4"></div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default PayButton;