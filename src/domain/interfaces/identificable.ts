import Id from '@helpers/Id'
import ComparableInterface from '@interfaces/comparable';

export default interface Identificable extends ComparableInterface {
	id: Id;
	getId(): Id;
};