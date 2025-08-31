import React from 'react'

function Stats() {
    return (
        <div className='container p-3'>
            <div className='row  p-5' >
                <div className='col-6 p-5 '>
                    <h1 className='fs-2 mb-4'>Trust with confidence</h1>

                    <h2 className='fs-4'>Customer-first always</h2>
                    <p className='text-muted'>That's why 1.3+ crore customer trust Zerodha with ₹3.5+ 
                        lakh crore worth of equity investments.
                    </p>

                    <h2 className='fs-4'>No spam or gimmicks</h2>
                    <p className='text-muted'>No gimmicks spam, "gimification", or annoying push
                        notifications. High quality apps that you use at your pace,
                        the way you like.
                    </p>

                    <h2 className='fs-4'>The Zerodha universe</h2>
                    <p className='text-muted'>Not just an app, but a whole ecosystem. Our investments in 30+
                        fintech startups offer you tailored servies specific to your needs.
                    </p>

                    <h2 className='fs-4'>Do better with money</h2>
                    <p className='text-muted'>With initiatives like Nudge and Kill Switch, we don't just
                        facilitate transaction, but actively help you do better with  your money.
                    </p>

                </div>

                <div className='col-6 p-5'>
                    <img src='media/images/ecosystem.png' style={{ width: "90%" }} />
                    <div className='text-center p-5'>
                        <a href='' className='mx-5' style={{textDecoration:"none"}}>Explore our product <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                        <a href='' className='my5'>Try Kite Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Stats;