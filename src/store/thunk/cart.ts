import {
	addToCart,
	getCarts,
	removeFromCart,
	updateCartQuantity,
} from '@services/cart';
import { QueryParams } from '@store/shared';
import {
	AddToCartBody,
	cartActions,
	CartItem,
	UpdateCartQuantityBody,
} from '@store/slices/cart';
import { commonActions } from '@store/slices/common';
import { Dispatch } from 'redux';
import { handleDispatchError } from '@utils/error';

export const handleGetCart =
	(param?: QueryParams) => async (dispatch: Dispatch) => {
		try {
			dispatch(cartActions.getCartRequest());
			const data = await getCarts(param);
			dispatch(cartActions.getCartSuccess(data));
		} catch (error) {
			handleDispatchError(error, dispatch, cartActions.getCartFailed);
		}
	};

export const handleAddToCart =
	(product: AddToCartBody) => async (dispatch: Dispatch) => {
		try {
			dispatch(cartActions.addToCartRequest());
			await addToCart(product);
			dispatch(cartActions.addToCartSuccess());
			dispatch(
				commonActions.showToast({
					message: 'Product added to cart success',
					type: 'success',
				}),
			);
			dispatch(handleGetCart({}) as any);
		} catch (error) {
			handleDispatchError(error, dispatch, cartActions.addToCartFailed);
			dispatch(
				commonActions.showToast({
					message: 'Product added to cart failed, please try again',
					type: 'error',
				}),
			);
		}
	};

export const handleRemoveFromCart =
	(id: number | string) => async (dispatch: Dispatch) => {
		try {
			dispatch(cartActions.removeFromCartRequest());
			await removeFromCart(id);
			dispatch(cartActions.removeFromCartSuccess());
			dispatch(
				commonActions.showToast({
					message: 'Product removed from cart success',
					type: 'success',
				}),
			);
			dispatch(handleGetCart() as any);
		} catch (error) {
			handleDispatchError(error, dispatch, cartActions.removeFromCartFailed);
			dispatch(
				commonActions.showToast({
					message: 'Product removed from cart failed, please try again',
					type: 'error',
				}),
			);
		}
	};

export const handleUpdateCartQuantity =
	(data: UpdateCartQuantityBody) => async (dispatch: Dispatch) => {
		try {
			dispatch(cartActions.updateCartQuantityRequest());
			await updateCartQuantity(data);
			dispatch(cartActions.updateCartQuantitySuccess());
			dispatch(handleGetCart() as any);
		} catch (error) {
			handleDispatchError(
				error,
				dispatch,
				cartActions.updateCartQuantityFailed,
			);
		}
	};
