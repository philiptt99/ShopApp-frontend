import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {HttpServiceService} from '../http-service.service';
import { error } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  public cartServiceEvent = new BehaviorSubject({});
  cartQty = 0;
  cartObj = [];
 public cartTotalPrice :any;

  constructor(private http:HttpServiceService) {

   this.getCartDetailsByUser(); 
   }

   getCartDetailsByUser(){
     this.http.postRequestWithToken("addtocart/getCartsByUserId",{}).subscribe((data:any)=>{
      //alert("Error while fetching the cart Details");
      this.cartObj = data;
      this.cartQty = data.length;
      this.cartTotalPrice = this.getTotalAmountOfTheCart();
      console.log(this.cartObj);
      this.cartServiceEvent.next({"status":"completed"})//emitter
     },error=>{
       alert("Please log in to access all features.");
     })
   }


  addCart(obj){
    //this.cartServiceEvent.next({"status":"completed"})//emitter
    var userId = this.http.getLoginDataByKey("user_id");
    var request  = {
      "userId":userId,
      "productId":obj.productId,
      "qty":obj.qty,
      "price":obj.price
    }
    this.http.postRequestWithToken("addtocart/addProduct",request).subscribe((data:any)=>{
      this.getCartDetailsByUser()
    },
    error=>{
      //if the products is already in cart
        alert("You already added the book. To add more books, go to checkout cart.");
    })
  }
  getCartOBj(){
    return this.cartObj;
  }
  getTotalAmountOfTheCart(){
    let obj = this.cartObj;
    let totalPrice  = 0;
   
    for(var o in obj ){      
      totalPrice = totalPrice +parseFloat(obj[o].price);
    }

    return totalPrice.toFixed(2);
  }
  getQty(){
    return this.cartQty;
  }

  alertCart(){
    alert('invalid');
   
  }

  removeCart(addCartId){
    /*
      var request = {
          "productId":"dummy_val",
          "cartId":cartId,
      }
      */
      var userId = this.http.getLoginDataByKey("user_id");
      var request = {
        "userId":userId,
        "addCartId":addCartId
      }
      this.http.postRequestWithToken("addtocart/removeProductFromCart",request).subscribe((data:any)=>{
          this.getCartDetailsByUser();
      },error=>{
     //   alert("Error while fetching the cart Details");
      })
  }
}
