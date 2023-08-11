// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
// import { useAuth } from 'src/auth'
import { Router, Route, Set, Private } from '@redwoodjs/router'

// import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import { useAuth } from 'src/auth'
import HeaderLayout from 'src/layouts/HeaderLayout/HeaderLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import WrapperLayout from 'src/layouts/WrapperLayout'
import AllContextProviders from 'src/providers'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <AllContextProviders>
        {/* <Route path="/" page={UnderConstructionPage} name="underConstruction" /> */}
        {/* <Route path="/" page={HomePage} name="home" /> */}

        <Private unauthenticated="addRoles" roles={['LENS_FORM', 'ADMIN']}>
          <Set wrap={[HeaderLayout, MainLayout, WrapperLayout]}>
            <Route path="/lens-profile-form" page={LensProfileFormPage} name="lensProfileForm" />
          </Set>
        </Private>

        <Private unauthenticated="profile" roles={'ADMIN'}>
          <Set wrap={[HeaderLayout, MainLayout, WrapperLayout]}>
            <Route path="/rewardable/new" page={RewardablePuzzleNewRewardablePuzzlePage} name="newRewardable" />
            {/* <Route path="/puzzle/{id}/edit" page={RewardablePuzzleEditRewardablePuzzlePage} name="editPuzzle" /> */}
          </Set>
        </Private>

        <Private unauthenticated="profile">
          {/* @TODO: Replace HeaderLayout once we get a minimal header */}
          <Set wrap={[HeaderLayout, MainLayout, WrapperLayout]}>
            <Route path="/add-roles" page={AddRolesPage} name="addRoles" />
            <Route path="/puzzle/{slug}/{step:Int}" page={RewardablePuzzleRewardablePuzzlePage} name="puzzleStep" />
            <Route path="/user/delete" page={DeletePage} name="delete" />
          </Set>

          <Set wrap={[HeaderLayout, MainLayout, WrapperLayout]}>
            <Route path="/claim/{id}" page={ClaimPage} name="claim" />
          </Set>
        </Private>

        <Set wrap={[HeaderLayout, MainLayout, WrapperLayout]}>
          <Route path="/profile" page={ProfilePage} name="profile" />
          <Route path="/redirect/{type}" page={RedirectPage} name="redirect" />

          <Route path="/puzzles" page={RewardablePuzzleRewardablePuzzlesPage} name="puzzles" />
          <Route path="/puzzles/{count:Int}/{page:Int}" page={RewardablePuzzleRewardablePuzzlesPage} name="puzzlesPagination" />
          <Route path="/packs" page={RewardablePackRewardablePacksPage} name="packs" />
          <Route path="/packs/{count:Int}/{page:Int}" page={RewardablePackRewardablePacksPage} name="packsPagination" />
          <Route path="/" page={PlayPage} name="play" />
          <Route path="/{count:Int}/{page:Int}" page={PlayPage} name="playPagination" />
          <Route path="/connect-accounts" page={ConnectAccountsPage} name="connectAccounts" />
        </Set>

        <Set wrap={[HeaderLayout, MainLayout]}>
          <Route path="/privacy-policy" page={PrivacyPolicyPage} name="privacyPolicy" />
        </Set>

        {/* @TODO: Replace HeaderLayout once we get a minimal header */}
        <Set wrap={[HeaderLayout, MainLayout, WrapperLayout]}>
          <Route path="/puzzle/{slug}" page={RewardablePuzzleRewardablePuzzlePage} name="puzzleLanding" />
          <Route path="/pack/{slug}" page={RewardablePackRewardablePackPage} name="packLanding" />
          {/* Anonymous Puzzles - landing and step pages */}
          <Route path="/a/puzzle/{slug}" page={AnonPuzzlePage} name="anonPuzzleLanding" />
          <Route path="/a/puzzle/{slug}/{step:Int}" page={AnonPuzzlePage} name="anonPuzzleStep" />
        </Set>

        {/* NotFoundPage can't be in a set */}
        <Route notfound page={NotFoundPage} />
      </AllContextProviders>
    </Router>
  )
}

export default Routes
