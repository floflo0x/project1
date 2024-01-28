import { useCallback, useState } from 'react';
import './login.css';
import { Link, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';

// https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png
// https://i.ibb.co/mBck0jc/logo4.png
// https://i.ibb.co/42yHF7R/logo3.png
// https://i.ibb.co/7nVhzFx/netbg-1.jpg

import {
	LoginSocialTwitter
} from 'reactjs-social-login';

// import {
//   TwitterLoginButton,
// } from 'react-social-login-buttons';

// const TwitterLoginButton = ({ triggerLogin, ...props }) => (
// 	<button onClick={triggerLogin} {...props}>
// 		Login with Twitter
// 	</button>
// );

// const SocialTwitterButton = LoginSocialTwitter(TwitterLoginButton);

function Login() {
    const REDIRECT_URI = 'https://mateys.xyz/home';

    const { connection } = useConnection();
    const { publicKey, sendTransaction, wallet } = useWallet();

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleApiCall = async (pkey) => {
	    try {
	      const formData = new FormData();
	      formData.append('walletAddress', pkey);
	      formData.append('twitter', '');

	      const response = await axios.post('https://mateys.xyz/web_api/create_user.php', formData, {
	        headers: {
          	'Content-Type': 'multipart/form-data', // Set the content type for FormData
        	},
	        maxBodyLength: Infinity,
	      });

	      console.log(JSON.stringify(response.data));
	    } catch (error) {
	      console.error(error);
	    }
	};

    const handleClick = async () => {
	    setIsButtonDisabled(false);
	    // console.log(publicKey.toString(), wallet);

	    handleApiCall(publicKey.toString());
	};

	const [provider, setProvider] = useState('');
  	const [profile, setProfile] = useState('');

	const onLoginStart = useCallback(() => {}, []);

  	const onLogoutSuccess = useCallback(() => {
	    setProfile(null);
	    setProvider('');
  	}, []);

  	console.log(profile, provider);

  	const location = useLocation();
  	const queryParams = new URLSearchParams(location.search);
  	let id = queryParams.get('id');

		// const handleSocialLogin = (user) => {
		// 	console.log("success...", user);
		// 	const tuName = user.profile?.screen_name;
		// 	console.log(tuName);
		// 	window.location.href = REDIRECT_URI;
		// };

		// const handleSocialLoginFailure = (err) => {
		// 	console.log("failed...", err);
		// }

	return (
		<div className="bg-black text-white" id="loginDiv">
			<header>
				<div className="container-fluid border-0" id="header">
					<div className="row">
						<div className="col-12 pt-0 pb-0 ps-5 pe-5">
							<img src="https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png" alt="netflix" width="100" height="100" id="logo1" />
						</div>
					</div>
				</div>
			</header>

			<section>
				<div className="container-fluid p-0">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-2 col-lg-3 col-xl-4"></div>
						<div className="col-12 col-sm-8 col-lg-6 col-xl-4 p-5" id="loginDiv2">
							<div>
							  <h2 className="text-capitalize" style={{ overflow: 'hidden' }}>sign in</h2>
							</div>

							{id === '1' && (
								<div className="mt-4 text-white text-center">
									<div className="containerWithoutScrollbar" style={{ margin: 0 }}>
	            						<WalletMultiButton />
	        						</div>
	        				
	        						<div className="mt-4 text-center">
								  		{wallet && publicKey ? (
								          <>
								            <Link
								             	to="/home"
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
							)}

							{id === '2' && (
								<div className="mt-2 text-center">
									<LoginSocialTwitter
										provider="twitter"
										client_id={'c3pTOERLYlo1QXlEcTZYcHp4Ylg6MTpjaQ' || ''}
									  	redirect_uri={REDIRECT_URI}
										// onLoginSuccess={handleSocialLogin}
										// onLoginFailure={handleSocialLoginFailure}
										onLoginStart={onLoginStart}
								        onLogoutSuccess={onLogoutSuccess}
								        onResolve={({ provider, data }: IResolveParams) => {
								            setProvider(provider);
								            setProfile(data);
								        }}
								        onReject={(err: any) => {
								            console.log(err);
								        }}
									>
										Login with Twitter
									</LoginSocialTwitter>
								</div>
							)}
						</div>
						<div className="col-12 col-sm-2 col-lg-3 col-xl-4"></div>
					</div>
				</div>
			</section>

			<section>
				<div className="container-fluid mt-2 d-none">
					<div className="row">
						<div className="col-12 col-sm-12 col-lg-3 col-xl-4">
						</div>
					</div>
				</div>
			</section>

			<footer>
				<div className="container-fluid p-0">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-12">
							Questions? Call 000-800-919-1694
						</div>
						<div className="col-12 col-sm-12 footer_div">
							<div>FAQ</div>
							<div>Help Centre</div>
							<div>Terms of Use</div>
							<div>Privacy</div>
							<div>Cookie Prefrences</div>
							<div>Corporate Information</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default Login;
