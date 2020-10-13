import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectShopSection } from '../../redux/shop/shop.selector'
import CollectionPreview from '../preview-collection/preview-collection.component'
import './collections-overview.styles.scss'

const CollectionOverview = ({ collections }) => {
    return (
        <div className="collection-overview">
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


export default connect(mapStateToProps)(CollectionOverview);