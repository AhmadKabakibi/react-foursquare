import React from 'react'
import {
  Badge,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardHeader
} from 'reactstrap'

const getIcon = (data) => {
  if (data.categories[0] && data.categories[0].icon) {
    return `${data.categories[0].icon.prefix}64${data.categories[0].icon.suffix}`
  }
}

const openMap = (data) => {
  return () => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURI(data.name)}%20${encodeURI(data.location.formattedAddress[0])}`)
}

const cardHeaderStyles = (data) => {
  return {
    backgroundImage: `url(${getIcon(data)})`
  }
}

const Venue = ({ data }) => {
  return (
    <Card onClick={openMap(data)}>
      <CardHeader style={cardHeaderStyles(data)}>
        {data.categories[0].name}
      </CardHeader>
      <CardBody>
        <CardTitle>{data.name}</CardTitle>
        <CardText>{data.location.address}</CardText>
        <CardText>
          <Badge color='success'>{data.location.distance}mts</Badge>
        </CardText>
      </CardBody>
    </Card>
  )
}

export default Venue
