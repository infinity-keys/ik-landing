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
import SiteLayout from 'src/layouts/SiteLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private unauthenticated="auth">
        {/* <Set wrap={ScaffoldLayout} title="Puzzles" titleTo="puzzles" buttonLabel="New Puzzle" buttonTo="newPuzzle"> */}
        <Route path="/puzzle/new" page={RewardablePuzzleNewRewardablePuzzlePage} name="newPuzzle" />
        <Route path="/puzzle/{id}/edit" page={RewardablePuzzleEditRewardablePuzzlePage} name="editPuzzle" />
        {/* Handle both /puzzle and /puzzle/1 routes. Place shorter route last to allow url creation to work */}
        <Route path="/puzzle/{slug}/{step:Int}" page={RewardablePuzzleRewardablePuzzlePage} name="puzzleStep" />

        {/* </Set> */}
      </Private>
      <Set wrap={SiteLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/user/delete" page={DeletePage} name="delete" />
        <Route path="/user" page={UserPage} name="user" />
        <Route path="/privacy-policy" page={PrivacyPolicyPage} name="privacyPolicy" />
        <Route path="/auth" page={AuthPage} name="auth" />
        <Route path="/puzzles" page={RewardablePuzzleRewardablePuzzlesPage} name="puzzles" />
        <Route path="/puzzles/{count:Int}/{page:Int}" page={RewardablePuzzleRewardablePuzzlesPage} name="puzzles" />
        <Route path="/packs" page={RewardablePackRewardablePacksPage} name="packs" />
        <Route path="/packs/{count:Int}/{page:Int}" page={RewardablePackRewardablePacksPage} name="packs" />
      </Set>
      <Route path="/puzzle/{slug}" page={RewardablePuzzleRewardablePuzzlePage} name="puzzleLanding" />
      <Route path="/pack/{slug}" page={RewardablePackRewardablePackPage} name="packLanding" />

      {/* NotFoundPage can't be in a set */}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
