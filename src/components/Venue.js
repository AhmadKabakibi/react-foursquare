import React from 'react'
import {
  Badge,
  Card,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap'

const getIcon = (data) => {
  if (data.categories[0] && data.categories[0].icon) {
    return `${data.categories[0].icon.prefix}64${data.categories[0].icon.suffix}`
  }
}

const Venue = ({ data }) => {
  return (
    <Card style={{
      backgroundImage: `url(${getIcon(data)})`,
      backgroundPosition: `right bottom`,
      backgroundRepeat: `no-repeat`,
      backgroundColor: `#e6eeff`
    }}>
      <CardBody>
        <CardTitle>{data.name}</CardTitle>
        <CardText>{data.location.address}</CardText>
        <CardText>
          <Badge color='primary' pill>{data.categories[0].name}</Badge>
        </CardText>
      </CardBody>
    </Card>
  )
}

export default Venue
