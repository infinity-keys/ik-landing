// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
import { useAuth } from '@redwoodjs/auth'
import { Router, Route, Set, Private } from '@redwoodjs/router'

// import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import HeaderFooterLayout from 'src/layouts/HeaderFooterLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import WrapperLayout from 'src/layouts/WrapperLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated="auth">
        <Route path="/puzzle/new" page={RewardablePuzzleNewRewardablePuzzlePage} name="newPuzzle" />
        <Route path="/puzzle/{id}/edit" page={RewardablePuzzleEditRewardablePuzzlePage} name="editPuzzle" />

        <Set wrap={[MainLayout, WrapperLayout]}>
          <Route path="/puzzle/{slug}/{step:Int}" page={RewardablePuzzleRewardablePuzzlePage} name="puzzleStep" />
        </Set>
      </Private>

      <Set wrap={[HeaderFooterLayout, MainLayout, WrapperLayout]}>
        <Route path="/user/delete" page={DeletePage} name="delete" />
        <Route path="/claim/{id}" page={ClaimPage} name="claim" />
        <Route path="/user" page={UserPage} name="user" />

        <Route path="/auth" page={AuthPage} name="auth" />
        <Route path="/puzzles" page={RewardablePuzzleRewardablePuzzlesPage} name="puzzles" />
        <Route path="/puzzles/{count:Int}/{page:Int}" page={RewardablePuzzleRewardablePuzzlesPage} name="puzzlesPagination" />
        <Route path="/packs" page={RewardablePackRewardablePacksPage} name="packs" />
        <Route path="/packs/{count:Int}/{page:Int}" page={RewardablePackRewardablePacksPage} name="packsPagination" />
      </Set>

      <Set wrap={[HeaderFooterLayout, MainLayout]}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/privacy-policy" page={PrivacyPolicyPage} name="privacyPolicy" />
      </Set>

      <Set wrap={[MainLayout, WrapperLayout]}>
        <Route path="/puzzle/{slug}" page={RewardablePuzzleRewardablePuzzlePage} name="puzzleLanding" />
        <Route path="/pack/{slug}" page={RewardablePackRewardablePackPage} name="packLanding" />
        {/* Anonymous Puzzles - landing and step pages */}
        <Route path="/a/puzzle/{slug}" page={AnonPuzzlePage} name="anonPuzzleLanding" />
        <Route path="/a/puzzle/{slug}/{step:Int}" page={AnonPuzzlePage} name="anonPuzzleStep" />
      </Set>

      {/* NotFoundPage can't be in a set */}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
