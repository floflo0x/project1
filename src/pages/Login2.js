import React from 'react';
import { Link } from 'react-router-dom';
import './login2.css';

function Login2() {
	return (
		<div className="l__div1 m-0 p-0">

			<section>
				<div className="container-fluid l__div3">
					<div className="row">
						<div className="col-12 col-sm-3"></div>
						<div className="col-12 col-sm-6 border l__div2">
							<div className="">
								<img src="https://i.ibb.co/GFvwssk/pirate-logo-removebg-preview.png" alt="netflix" className="l__div__img" />
							</div>

							<div className="mb-4">
								<h2>SIGN IN</h2>
							</div>

							<div>
								<Link 
									to="/login/?id=1" 
									className="btn link__div__l"
								> WALLET
								</Link>
								<p className="mt-3 mb-3" style={{ fontWeight: "500", fontSize: "20px" }}>OR</p>
								<Link 
									to="/login/?id=2" 
									className="btn link__div__l"
								>VIA X
								</Link>
							</div>
						</div>
						<div className="col-12 col-sm-3"></div>
					</div>
				</div>
			</section>

		</div>
	);
}

export default Login2;