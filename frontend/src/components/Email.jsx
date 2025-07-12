import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Email = ({ username, userEmail, validation_length }) => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (validation_length === 1) {
      setMsg("✅ Your post has been reviewed and validated by Validator 1.\n" +
        "🔍 Initial checks have been completed.\n" +
        "📜 Content verification is done.\n" +
        "⚡ Formatting and structure reviewed.\n" +
        "⏳ Awaiting further validation.\n" +
        "🔄 Next step: Validator 2 review.\n" +
        "📢 Ensure compliance with platform guidelines.\n" +
        "📧 You will receive an update soon.\n" +
        "🛠 Minor improvements may be required.\n" +
        "📞 Contact support if you have queries.");
    } else if (validation_length === 2) {
      setMsg("✅ Your post has passed validation from Validator 1 & 2.\n" +
        "🔍 Additional content checks completed.\n" +
        "📜 Compliance with platform rules verified.\n" +
        "⚡ Technical formatting checked.\n" +
        "⏳ Moving to next validation stage.\n" +
        "🔄 Next step: Validator 3 review.\n" +
        "📢 Your post is progressing well!\n" +
        "📧 Stay tuned for further updates.\n" +
        "🛠 Minor refinements may be needed.\n" +
        "📞 Support is available for assistance.");
    } else if (validation_length === 3) {
      setMsg("✅ Your post has been successfully validated by Validator 1, 2 & 3.\n" +
        "🔍 Content quality and accuracy confirmed.\n" +
        "📜 No policy violations detected.\n" +
        "⚡ All technical checks completed.\n" +
        "⏳ Almost ready for final approval!\n" +
        "🔄 Next step: Validator 4 review.\n" +
        "📢 Your post is in the final review stages.\n" +
        "📧 Expect an update soon.\n" +
        "🛠 Minor adjustments may enhance visibility.\n" +
        "📞 Reach out if you need help.");
    } else if (validation_length === 4) {
      setMsg("✅ Your post has been reviewed by Validator 1, 2, 3 & 4.\n" +
        "🔍 It has passed all content and technical checks.\n" +
        "📜 Policy compliance confirmed.\n" +
        "⚡ Ready for the final hosting step.\n" +
        "⏳ Just one more step remaining!\n" +
        "🔄 Next step: Hosting confirmation.\n" +
        "📢 Your post is almost live.\n" +
        "📧 A final notification will be sent soon.\n" +
        "🛠 Review post visibility options.\n" +
        "📞 Contact support for last-minute changes.");
    } else if (validation_length === 5) {
      setMsg("🎉 Congratulations! Your post has passed all validation steps and is now hosted.\n" +
        "✅ Validator 1, 2, 3, and 4 have approved your content.\n" +
        "🔍 All quality and compliance checks are done.\n" +
        "📜 Your post is now publicly accessible.\n" +
        "⚡ You can share your content with others.\n" +
        "📢 Make sure to monitor engagement.\n" +
        "📧 Notifications have been sent to relevant users.\n" +
        "🛠 You can update your post anytime if needed.\n" +
        "📊 Track performance using platform insights.\n" +
        "📞 For any modifications, contact support.");
    } else {
      setMsg("⚠️ Your post has been checked but is not hosted yet.\n" +
        "🔍 Validation is still in progress.\n" +
        "📜 Some refinements might be required.\n" +
        "⚡ Ensure all guidelines are met.\n" +
        "⏳ Awaiting further review.\n" +
        "🔄 Next steps will be communicated soon.\n" +
        "📢 Please check your email for updates.\n" +
        "📧 If urgent, contact support for assistance.\n" +
        "🛠 Minor changes may speed up approval.\n" +
        "📞 Thank you for your patience.");
    }

  }, [validation_length]);
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qwoel7l",
        "template_lunlwg5",
        form.current,
        "ggyPf5Jk4UeZyFbDJ"
      )
      .then(
        (result) => {
          console.log("Email sent successfully", result.text);
          setIsSent(true);
          form.current.reset();
        },
        (error) => {
          console.error("Error found to sending Email", error.text);
        }
      );
  };

  return (
    <div className=" w-full float-start mx-auto  p-6 ">
      <h2 className="text-xl font-bold mb-4">Send Email </h2>
      {isSent && <p className="text-green-500">Email sent successfully!</p>}
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <input
          type="text"
          name="user_name"
          value={username}
          readOnly
          className="w-full p-2 border border-gray-300 text-black "
        />
        <input
          type="email"
          value={userEmail}
          name="user_email"
          readOnly
          className="w-full p-2 border border-gray-300 text-black "
        />
        <textarea
          name="message"
          value={msg}
          rows={8}
          className="w-full p-2 border border-gray-300 text-black "
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2  hover:bg-green-600"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default Email 
