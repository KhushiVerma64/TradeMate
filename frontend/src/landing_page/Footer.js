import React from 'react'

function Footer() {
    return (
        <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img src="media/images/logo.jpg" style={{ width: "60%" }} />
            <p className='mt-3 text-muted'>
              &copy; 2010 - 2024, Not TradeMate Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col footer-link   ">
            <p className='fs-5'>Company</p>
            <a href="">About</a>
            <br />
            <a href="">Products</a>
            <br />
            <a href="">Pricing</a>
            <br />
            <a href="">Referral programme</a>
            <br />
            <a href="">Careers</a>
            <br />
            <a href="">TradeMate.tech</a>
            <br />
            <a href="">Press & media</a>
            <br />
            <a href="">TradeMate cares (CSR)</a>
            <br />
          </div>
          <div className="col footer-link ">
            <p className='fs-5'>Support</p>
            <a href="">Contact Us</a>
            <br />
            <a href="">Support portal</a>
            <br />
            <a href="">Z-Connect blog</a>
            <br />
            <a href="">List of charges</a>
            <br />
            <a href="">Downloads & resources</a>
            <br />
          </div>
          <div className="col footer-link ">
            <p className='fs-5'>Account</p>
            <a href="">Open an account</a>
            <br />
            <a href="">Fund transfer</a>
            <br />
            <a href="">60 day challenge</a>
            <br />
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            TradeMate Broking Ltd.: Member of NSE​ &​ BSE – SEBI Registration no.:
            INZ000031633 CDSL: Depository services through TradeMate Securities
            Pvt. Ltd. – SEBI Registration no.: IN-DP-100-2015 Commodity Trading
            through TradeMate Commodities Pvt. Ltd. MCX: 46025 – SEBI Registration
            no.: INZ000038238 Registered Address: TradeMate Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any
            complaints pertaining to securities broking please write to
            complaints@TradeMate.com, for DP related to dp@TradeMate.com. Please
            ensure you carefully read the Risk Disclosure Document as prescribed
            by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            Communication, Speedy redressal of the grievances
          </p>

          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          
        </div>
         <div className='container footer-link f-link'>
            <a href=''>NSE</a>
            <a href=''>BSE</a>
            <a href=''>MCX</a>
            <a href=''>Terms & conditions</a>
            <a href=''>Policies & procedures</a>
            <a href=''>privacy policy</a>
            <a href=''>Disclosure</a>
         </div>
      </div>
    </footer>
    );
}

export default Footer;