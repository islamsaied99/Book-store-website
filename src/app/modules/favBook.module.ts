export interface Fav_Book_module  {
    "book_id":string,
    "discount"?:number,
      "title"?: string,
      "authors"?: String[],
      "publisher"?: string,
      "publishedDate"?: string,
      "description"?:string,
      "categories"?: string,
      "averageRating"?: number,
      "contentVersion"?: string,
        "imagesmallThumbnail"?:string,
        "imagethumbnail"?: string ,
      "language"?: string
      "country"?: string,
      "price"?: string
  }