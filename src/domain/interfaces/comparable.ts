import Id from '../helpers/Id'

export default interface Comparable {
	isSame(item: this): boolean;
};