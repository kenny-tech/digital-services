import React from "react";

const RechargeAmount = ({ network, amount}) => {
    return (
        <div className="col-md-4 mb-3">
            <div class="card" style={{width: '18rem', height: '12rem'}}>
                <div class="card-body">
                    <div className="d-flex justify-content-center mb-1">
                        <img src={`/${network}.png`} class="img-fluid mx-auto rounded" alt={network} width={40} height={40} />
                    </div>
                    <h3 class="card-text text-center">{amount}</h3>
                    <br/>
                    <button type="button" class="btn btn-success btn-lg btn-block mb-5">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default RechargeAmount;
