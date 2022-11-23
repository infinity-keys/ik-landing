// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import SiteLayout from 'src/layouts/SiteLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={SiteLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/puzzle" page={PuzzlePage} name="puzzle" />
        <Route path="/step" page={StepPage} name="step" />
        <Route path="/user/delete" page={DeletePage} name="delete" />
        <Route path="/user" page={UserPage} name="user" />
        <Route path="/privacy-policy" page={PrivacyPolicyPage} name="privacyPolicy" />
      </Set>

      {/* NotFoundPage can't be in a set */}
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
