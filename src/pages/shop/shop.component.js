import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectShopSection } from '../../redux/shop/shop.selector'

import CollectionPreview from '../../components/preview-collection/preview-collection.component'

const ShopPage = ({collections}) => {
    return(
        <div className ="shop-page">
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectShopSection
})


export default connect(mapStateToProps)(ShopPage);