import React from 'react'
import {connect} from 'react-redux'

import CollectionItem from '../../components/collection-item/collection-item.component'

import {selectCollection} from '../../redux/shop/shop.selector'

import { CollectionPageContainer, CollectionTitle, CollectionItemsContainer } from './collection.styles'

const CollectionPage = ({ collection: { title, items } }) => {
    return (
        <CollectionPageContainer>
            <CollectionTitle>{title.toUpperCase()}</CollectionTitle>
            <CollectionItemsContainer>
                {
                    items.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

const mapToStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapToStateToProps)(CollectionPage);