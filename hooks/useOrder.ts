import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IOrder } from "../interfaces";
import Cookie from "js-cookie";

export const useOrder = (
  url: string
): [order: IOrder, getOrder: () => void] => {
  const [order, setOrder] = useState({
    orderItems: [
      {
        _id: "",
        title: "",
        size: "",
        quantity: 0,
        slug: "",
        image: "",
        price: 0,
        gender: "",
      },
    ],
    shippingAddress: {
      firstName: "",
      lastName: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      phone: "",
    },
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    isPaid: false,
  });

  const router = useRouter()

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {

    try {
        const {data} = await axios.post(url, {
          token: Cookie.get("token"),
        });

        const orderAux: IOrder = data.order
    
        setOrder(orderAux);
    } catch (error) {
        console.log(error)
        router.replace('/')
    }
  };

  return [order, getOrder];
};
