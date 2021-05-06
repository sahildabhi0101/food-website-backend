// exports.createpostvalidator = (req, res,next) =>
// {
//     req.check('title',"write a title").notEmpty();
//     req.check('title','please enter a title between 4 to 150 character').isLength({min:4 , max:150});

//     req.check('body',"write a body").notEmpty();
//     req.check('body','please enter a body between 4 to 2000 character').isLength({min:4 , max:2000});

//     const errors = req.validationErrors()
//     if(errors)
//     {
//       const firsterror = errors.map((error) => error.msg)[0]
//       return res.status(400).json({error: firsterror})
//     }

//     next();
// };

exports.usersignupvalidator = (req,res,next) =>
{
  //name is not null and length- 4-10
  req.check("name","Name is required").notEmpty();
  
  // email is not null and valid
  req.check("email","email must between 2 to 20 letter")
  .matches(/.+\@.+\..+/)
  .withMessage("Email must contain @")
  .isLength({min:4,  max:2000})
  // .withMessage("Email must contain at least 4 letter")

  //password
  req.check("password","Name is required").notEmpty();
  req.check("password")
  .isLength({min:6})
  .withMessage("Password must contain at least 6 characters")
  .matches(/\d/)
  .withMessage("password must contain a number")

  //error
  const errors = req.validationErrors()
  if(errors)
  {
    const firsterror = errors.map((error) => error.msg)[0]
    return res.status(400).json({error: firsterror})
  }

  next();
}

exports.passwordResetValidator = (req, res, next) => {
  // check for password
  req.check("newPassword", "Password is required").notEmpty();
  req.check("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("must contain a number")
      .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware or ...
  next();
};
