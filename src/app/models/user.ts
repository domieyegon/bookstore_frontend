import {UserPayment} from '../models/user-payment';
import {UserShipping} from '../models/user-shipping';

export class User {

    public id: number;
    public firstname: string;
    public lastname: string;
    public username: string;
    public password: string;
    public email: string;
    public phone: string;
    public enabled: boolean;

    public userPaymentList: UserPayment[];
    public userShippingList: UserShipping[];

}