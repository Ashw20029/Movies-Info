# Movie Search App

A React Native mobile application that allows users to search for movies and manage their favorites using the OMDb API.

## Features

- Search movies by title
- View movie details including poster, title, year, genre, and rating
- Save favorite movies using AsyncStorage
- Load more movies with infinite scroll
- Responsive and user-friendly interface

## Technologies Used

- React Native
- Expo Router
- JavaScript
- OMDb API
- AsyncStorage for local storage
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/movie-search-app.git
```

2. Navigate to the project directory
```bash
cd movie-search-app
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Open the app on your device using Expo Go or run it in a web browser

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   └── favorites.tsx
│   └── movie/
│       └── [id].tsx
├── components/
│   └── MovieCard.tsx
├── hooks/
│   └── useFavorites.ts
├── types/
│   └── movie.ts
└── utils/
    └── api.ts
```

## Features Implementation

### Search Functionality
- Implemented in `app/(tabs)/index.tsx`
- Uses the OMDb API to fetch movie data
- Displays results in a scrollable list
- Supports infinite scrolling

### Movie Details
- Implemented in `app/movie/[id].tsx`
- Shows comprehensive movie information
- Includes poster, title, year, genre, plot, and rating

### Favorites System
- Implemented using AsyncStorage
- Managed through `hooks/useFavorites.ts`
- Persists user's favorite movies
- Supports adding  favorites

### UI Components
- Custom MovieCard component for consistent movie display
- Tab-based navigation for easy access to search and favorites
- Loading states and error handling
- Responsive design for various screen sizes

## API Integration

The app uses the OMDb API for fetching movie data. The API integration is handled in `utils/api.ts`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Images


1)Search Screen
![image](https://github.com/user-attachments/assets/8d3f84ab-b788-4658-91ec-9aa8bab5807a)


2)Add Favourites

![image](https://github.com/user-attachments/assets/fbe76ea7-c799-4235-9fb0-db67089900e3)



![image](https://github.com/user-attachments/assets/4ade343d-6ec9-4ea6-b746-4e48fbd4f788)



3)Favourite movies Screens

![image](https://github.com/user-attachments/assets/0694ede9-974d-40c1-8d7b-d26d8a0d7914)

