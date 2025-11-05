import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainLayout, PageLoader } from '@/shared/ui';

const HomePage = lazy(() => import('@/pages/HomePage'));
const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const SearchresultsPage = lazy(() => import('@/pages/SearchResultsPage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritePage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const AccountPage = lazy(() => import('@/pages/AccountPage'));

export function App() {
  return (
    <BrowserRouter basename='/noxer'>
      <Suspense fallback={<PageLoader />} >
        <Routes>
          <Route path='/' element={<MainLayout />} >
            <Route index element={<HomePage />} />
            <Route path='catalog' element={<CatalogPage />} />
            <Route path='catalog/:searchValue' element={<SearchresultsPage />} />
            <Route path='favorites' element={<FavoritesPage />} />
            <Route path='cart' element={<CartPage />} />
            <Route path='account' element={<AccountPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
