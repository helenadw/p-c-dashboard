import React from 'react';
import './RecentOrders.css';

const RecentOrders = ({ data }) => {

    return (
        <div className="recent-orders">
            <h2>Recent Orders</h2>
            <div className="recent-orders-container">
                {data.map(order => {
                    return (
                        <div className="recent-orders-card" key={order.fields.order_id}>
                            <h4>{order.fields.product_name.toUpperCase()}</h4>
                            <p>{`£` + order.fields.price}</p>
                            <p>{order.fields.order_placed}</p>
                            <p className={order.fields.order_status === 'in_progress' ? 
                                'order-status in-progress' :
                                order.fields.order_status === 'shipped' ? 
                                'order-status shipped' : 
                                order.fields.order_status === 'cancelled' ? 
                                'order-status cancelled' :
                                'order-status'}>
                                    {order.fields.order_status.replace(/_/g, ' ').toUpperCase()}
                                </p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )

}

export default RecentOrders;
    