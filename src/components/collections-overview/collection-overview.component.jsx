import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectShopSection } from '../../redux/shop/shop.selector'

import CollectionPreview from '../preview-collection/preview-collection.component'

import { CollectionOverviewContainer } from './collection-overview.styles'

const CollectionOverview = ({ collections }) => {
    return (
        <CollectionOverviewContainer>
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
            }
        </CollectionOverviewContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectShopSection
})


export default connect(mapStateToProps)(CollectionOverview);