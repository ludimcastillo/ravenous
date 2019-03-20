const apiKey = 'snUkNEeSRq3QbPjHIotc6lZHJy57-YR3B0YPR-wD0jux7zSnOy7JjNw1jJ9_mZTvnAC6_zlk4lWaD90r4cqa0R0j4A6MuvqAg27QotNT4Tus-AEJA7V4dp923byRXHYx';

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
      {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if(jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => {
            const address = `${business.location.address1}, ${business.location.address2} ${business.location.address3}`;
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: address,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            };
          });
        }
      });
  }
}

export default Yelp;