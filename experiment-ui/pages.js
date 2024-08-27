/**
 * This is the end page that is shown after the experiment
 */
function endPage() {
	let link = '';
	let atag = '';
	let interval;
	// the value compared below is hardcoded in the .env file produced by Copier
	// if you modify the value in the .env file or your env vars to a completion code provided by Prolific
	// a link will be presented to users that redirects to Prolific with the completion code populating
	// a query string parameter
	if (process.env.NODE_APP_completionCode !== 'ABCD1234') {
		link = 'https://app.prolific.com/submission/complete?cc=${process.env.NODE_APP_completionCode}';
		let countdown = 5;
		atag = `<a href=>Click here to redirect to Prolific.</a> You will be redirected automatically in <span id="countdown">${countdown}</span> seconds...`;
		interval = setInterval(() => {
			countdown -= 1;
			document.getElementById('countdown').innerText = countdown;
		}, 1000);

		setTimeout(() => {
			clearInterval(interval);
			window.location.href = link;
		}, 5000);
	}
	let html = `<div class="msg">Thank you for participating in our experiment.<br/>${atag}</div>`;

	document.body.innerHTML = html;
}

function waitPage() {
	document.body.innerHTML = `<div class="msg">Please wait until the data has been transferred.<br>This can take up to a minute.</div>`
}

function errorPage() {
	document.body.innerHTML = "<p>We are sorry, there has been an unexpected technical issue.<br/>Thank you for your understanding.</p><aclassName='App-link'href='https://app.prolific.co'target='_blank'rel='noopener noreferrer'>Prolific</a>"
}

function consentForm() {
	document.body.innerHTML = `
  <!-- Study headers -->
  <h1>CONSENT FORM</h1>

  <hr>
  <p>
    <b>TITLE OF RESEARCH:</b> Research Project Title
    <br>
    <b>PRINCIPAL INVESTIGATOR</b>: Smith, John Ph.D.
    <br>
    <b>PRINCIPAL INVESTIGATOR’S DEPARTMENT</b>: Department, Institution
  </p>
  <hr>

  <!-- Intro paragraph -->
  <p>
    You are being invited to take part in a research study. Before you decide to participate in this study, it is important that you understand why the research is being done and what it will involve. Please take the time to read the following information carefully. Please contact the researcher if there is anything that is not clear or if you need more information.
  </p>

  <!-- Study purpose -->
  <h2>Purpose of the research:</h2>
  <p>
    We are looking to understand...
  </p>

  <!-- Study duration -->
  <h2>Expected duration of participation:</h2>
  <p>
    <!-- Adapt for experiment -->
    This experiment should take between <font style="color:red">30-45 minutes</font> to complete.
  </p>

  <!-- Study procedures -->
  <h2>Study Procedures:</h2>
  <p>
    In this experiment, you will...
  </p>

  <!-- Risks or discomforts -->
  <h2>Risks or discomforts as a result of participation:</h2>
  <p>
    The activities in the study carry no risk / risk of...
  </p>

  <!-- Only for studies using questionnaires -->
  <p>
    This study includes questions...
  </p>

  <p>
    Examples of such questions are:
    <ul>
      <li>Question 1?</li>
      <li>Question 2?</li>
  </ul>
  </p>

  <!-- Benefits -->
  <h2>Benefits as a result of participation:</h2>
  <p>
    There will be no direct benefit to you from this research (aside from the monetary compensation you will receive).
  </p>

  <!-- Confidentiality -->
  <h2>Confidentiality:</h2>
  <p>
    Your responses, after removal of any identifiable private information, could be used for future research studies or distributed to another investigator for future research studies, or shared as part of publication of the research study without additional consent from you. Data will be shared such that it cannot, in any way, be traced back to you.
  </p>

  <p>
    In particular, data from this study will be submitted to the National Institute of Mental Health Data Archive (NDA) at the National Institutes of Health (NIH). NDA is a large database where deidentified study data from many National Institute of Mental Health (NIMH) studies are stored and managed. Deidentified study data means that no personal information about you is included. Sharing deidentified study data helps researchers learn new and important things about mental health and substance use more quickly than before.
  </p>

  <p>
    Every researcher (and institutions to which they belong) who requests use of your deidentified study data must promise to keep your data safe and promise not to try to learn your identity. Sharing your study data does have some risks, although these risks are rare. Your study data could be accidentally shared with an unauthorized person who may attempt to learn your identity. The study researchers will make every attempt to protect your identity.
  </p>

  <!-- Compensation -->
  <h2>Compensation:</h2>
  <p>
    Participants will be compensated with total payment (base payment + bonus) of at least $ dollars per hour (or the relevant fraction for experiments that require less time).
  </p>

  <!-- Contact information -->
  <h2>Who to contact with questions:</h2>
  <p>
    1. Principal investigator:

    <ul style="list-style-type:none;">
      <li>Smith, John Ph.D.</li>
      <li>Department, Institution</li>
      <li>Email: smith@institution.org</li>
    </ul>

  </p>

  <p>
    2. If you have questions regarding your rights as a research subject, or if problems arise which you do not feel you can discuss with the Investigator, please contact:

    <ul style="list-style-type:none;">
      <li>Contact's Title</li>
      <li>Office of Contact</li>
      <li>Email: contact@institution.org</li>
    </ul>
  </p>
  <p> If you wish to save a copy of the consent form, click the Print button to print and/or save as PDF: 
    <br>
    <button id="print">Print or Save Consent Form</button>
    <br>
  </p>

  <hr>

  <!-- Consent -->
  <p>
    I understand the information that was presented and that:

    <blockquote>
      My participation is voluntary. Refusal to participate will involve no penalty or loss of benefits to which I am otherwise entitled. I may discontinue participation at any time without penalty or loss of benefits. I do not waive any legal rights or release Institution or its agents from liability for negligence.

    </blockquote>

    By clicking the box below, I hereby give my consent to be the subject of your research.
  </p>

  <button id="consent">I accept</button>
  <button id="decline">No thank you</button>
`;
	document.getElementById('print').onclick = () => {
		window.print();
	}
}

function declinePage() {
	let html = `<div class="msg">Thank you for considering participating in our study.</div>`;
	document.body.innerHTML = html;
}

export { endPage, waitPage, errorPage, consentForm, declinePage };
