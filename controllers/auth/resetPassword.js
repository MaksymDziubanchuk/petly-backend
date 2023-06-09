const jwt = require('jsonwebtoken')
const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')
const sendVerifyEmail = require('../../services/email/sendVerifyEmail')
require('dotenv').config()

const { BASE_URL, SECRET_KEY } = process.env

const resetPassword = async (req, res, next) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        next(HttpError(404, 'Email not found'))
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
    const result = await User.findByIdAndUpdate(
        user._id,
        { token },
        { new: true }
    )

    if (!result) {
        next(HttpError(404))
    }

    const resetPasswordEmail = {
        to: email,
        subject: 'Reset password',
        html: `<!DOCTYPE html
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
        lang="ru"
      >
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="color-scheme" content="light dark" />
          <meta name="supported-color-schemes" content="light dark" />
          <style type="text/css">
            @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Roboto:ital,wght@1,100&display=swap");

            table {
              border-spacing: 0;
              mso-cellspacing: 0;
              mso-padding-alt: 0;
            }

            td {
              padding: 0;
            }

            #outlook a {
              padding: 0;
            }

            a {
              text-decoration: none;
              color: #ffffff;
              font-size: 16px;
            }

            /* Custom Dark Mode Colors */
            :root {
              color-scheme: light dark;
              supported-color-schemes: light dark;
            }

            @media (prefers-color-scheme: dark) {
              body,
              center {
                background-color: #202936 !important;
              }

              table,
              td {
                background-color: #293546 !important;
                border-radius: 18px;
              }

              h1,
              h2,
              h3,
              p,
              span {
                color: #ffffff !important;
              }
              #link_verify {
                color: #a4aaff !important;
              }
              #logo_t {
                color: #f59256 !important;
              }
            }
          </style>

          <!--[if (gte mso 9)|(IE)]>
            <style type="text/css">
              table {
                border-collapse: collapse !important;
              }
            </style>
          <![endif]-->

          <!--[if (gte mso 9)|(IE)]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG />
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          <![endif]-->
        </head>

        <body
          style="margin: 0; padding: 0; min-width: 100%; background-color: #fdf7f2"
        >
          <!--[if (gte mso 9)|(IE)]>
            <style type="text/css">
              body {
                background-color: #fdf7f2 !important;
              }
              body,
              table,
              td,
              p,
              a {
                font-family: sans-serif, Arial, Helvetica !important;
              }
            </style>
          <![endif]-->

          <center
            style="
              width: 100%;
              table-layout: fixed;
              background-color: #fdf7f2;
              padding-top: 40px;
              padding-bottom: 40px;
            "
          >
            <div
              style="
                max-width: 600px;
                background-color: #ffffff;
                box-shadow: 0 0 14px rgba(0, 0, 0, 0.13);
                border-radius: 20px;
              "
            >
              <!-- Preheader (remove comment) -->
              <div
                style="
                  font-size: 0px;
                  color: #ffffff;
                  line-height: 1px;
                  mso-line-height-rule: exactly;
                  display: none;
                  max-width: 0px;
                  max-height: 0px;
                  opacity: 0;
                  overflow: hidden;
                  mso-hide: all;
                "
              >
                Reset password
              </div>
              <!-- End Preheader (remove comment) -->

              <!--[if (gte mso 9)|(IE)]>
              <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
                style="color:#000000;">
              <tr>
              <td>
            <![endif]-->

              <table
                align="center"
                border="0"
                cellspacing="0"
                cellpadding="0"
                role="presentation"
                style="
                  color: #000000;
                  font-family: 'Manrope', sans-serif, Arial, Helvetica;
                  background-color: #ffffff;
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  max-width: 600px;
                  border-radius: 20px;
                "
              >
                <!-- Logo -->
                <tr>
                  <td>
                    <table
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      role="presentation"
                    >
                      <tr>
                        <td style="padding: 30px 0 19px 45px; text-align: center">
                          <a
                            href="https://team-project-pet-support.vercel.app/"
                            target="_blank"
                          >
                            <p
                              style="
                                color: #000000;
                                font-style: normal;
                                font-weight: 700;
                                font-size: 24px;
                                margin: 0;
                              "
                            >
                              pe<span id="logo_t" style="color: #f59256">t</span>ly
                            </p>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- End Logo -->

                <!-- Hero -->
                <tr>
                  <td style="padding: 0px 24px 25px 24px">
                    <table
                      align="center"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      role="presentation"
                      style="width: 100%; max-width: 600px"
                    >
                      <tr>
                        <td style="padding: 0 0 30px 0; text-align: center">
                          <img
                            src="https://i.ibb.co/9q6FYxc/cat-crying.png"
                            alt="Сat crying"
                            border="0"
                            width="215"
                            style="width: 100%; max-width: 215px"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 8px 0; text-align: center">
                          <p
                            style="
                              margin: 0;
                              font-weight: 800;
                              font-size: 24px;
                              line-height: 33px;
                              color: #000000;
                            "
                          >
                            Forgot your password?
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 25px 0; text-align: center">
                          <p
                            style="
                              padding: 0 15px 0 15px;
                              margin: 0;
                              font-weight: 500;
                              font-size: 14px;
                              line-height: 26px;
                              color: #595b61;
                            "
                          >
                            That's okay, it happens! Click on the button belom to
                            reset your password.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            align="center"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                style="
                                  text-align: center;
                                  background-color: #f59256;
                                  border-radius: 50%;
                                "
                              >
                                <a
                                  href="${BASE_URL}/api/auth/reset-password/${token}"
                                  target="_blank"
                                  style="
                                    background-color: #f59256;
                                    font-weight: 500;
                                    font-size: 20px;
                                    line-height: 27px;
                                    color: #ffffff;
                                    text-align: center;
                                    text-decoration: none;
                                    padding: 8px 16px 8px 16px;
                                    display: inline-block;
                                    border-radius: 40px;
                                  "
                                >
                                  &nbsp;&nbsp;&nbsp;Reset your
                                  password&nbsp;&nbsp;&nbsp;
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- End Hero -->
              </table>

              <!--[if (gte mso 9)|(IE)]>
              </td>
              </tr>
              </table>
            <![endif]-->
            </div>
          </center>
        </body>
      </html>`,
    }

    await sendVerifyEmail(resetPasswordEmail)

    res.json({
        message: 'Password reset email sent',
    })
}

module.exports = resetPassword
