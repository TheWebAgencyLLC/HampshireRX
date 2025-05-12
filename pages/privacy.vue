<template>
  <AppHeader />
  <div class="relative">
    <div
      class="mx-auto px-4 bg-[#F7F7F5] mt-4 rounded-bl-3xl rounded-br-3xl pb-16"
    >
      <div
        class="flex flex-col items-center text-center xl:px-0 px-6 justify-center"
      >
        <h1 class="text-5xl font-bold mb-4">
          Affordable Medications, Trusted Service
        </h1>
        <p class="text-2xl mb-4">
          Access reliable generic drugs at fair prices,
          <span class="underline-animation">no insurance needed!</span>
        </p>
      </div>

      <div class="max-w-4xl px-12 mx-auto">
        <SearchBar @search="(n) => handleSubmit(n)" />
      </div>
    </div>
  </div>

  <div class="w-full text-center mt-10">
    <ErrorMessage v-if="errorText" :text="errorText" />
  </div>
  <div>
    <div
      id="searchResults"
      class="mt-20 w-full flex flex-wrap justify-center items-start gap-4 sm:flex-col sm:items-stretch md:flex-row md:items-center"
    ></div>
  </div>
  <div class="mt-2 p-4 w-full">
    <div
      v-if="medData"
      :class="[
        'flex flex-wrap justify-center gap-4',
        medData.length > 3
          ? 'sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center place-items-center'
          : '',
      ]"
    >
      <ResultCard
        v-for="med in medData"
        :key="med.id"
        :data="med"
        class="w-full sm:w-auto sm:max-w-[300px] flex-grow-0"
      />
    </div>
  </div>

  <div class="flex flex-col items-center xl:px-0 px-8">
    <div class="w-full md:w-3/4 mx-auto">
      <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-4">PRIVACY POLICY</h1>
        <p class="text-gray-600 mb-4">Last updated November 21, 2024</p>

        <div class="mb-4 bg-white shadow-md rounded-lg p-4">
          <p>
            This Privacy Policy (“Privacy Policy”) describes the data protection
            practices of Maniar Pharmacy Inc DBA Hampshire Pharmacy. We refer to
            the Website and other services provided by Hampshire Pharmacy
            together in this Privacy Policy as the “Services.” <br />
            <br />

            Privacy and data protection laws vary around the world and among the
            individual states, provinces, and districts or zones within certain
            countries. In some jurisdictions, privacy laws grant you, the data
            subject, and certain specific rights regarding your personal data.
            We refer to these types of privacy laws as “Comprehensive Privacy
            Laws.” Examples of Comprehensive Privacy Laws include the consumer
            privacy laws of several U.S. states, such as California. We
            therefore also use this notice to inform you of certain specific
            rights you have under the Comprehensive Privacy Laws with respect
            your personal data
          </p>
        </div>

        <div class="mb-4 bg-white shadow-md rounded-lg p-4">
          <p>
            When we refer to “personal data” or “personal information” in this
            notice, we mean any information, data, or data element, whether in
            electronic or other form, that, alone or in combination with other
            elements, can be used to distinguish, trace, or discover your
            identity. Certain data privacy laws include specific elements or
            defined terms for what they consider to be personal data. Where such
            data privacy laws apply to our processing of your personal data,
            then the terms “personal data” and “personal information” includes
            the specific elements and defined terms required by such laws.
          </p>
        </div>

        <div class="container mx-auto">
          <div class="text-sm mb-4">
            <h6 class="text-lg font-semibold">TABLE OF CONTENTS</h6>
            <ol class="list-none pl-0 text-lg">
              <li>
                <a href="#section1" class="text-blue-500 hover:underline"
                  >Collecting Your Information
                </a>
              </li>
              <li>
                <a href="#section9" class="text-blue-500 hover:underline"
                  >Using Your Information
                </a>
              </li>
              <li>
                <a href="#section16" class="text-blue-500 hover:underline"
                  >Sharing Your Information
                </a>
              </li>
              <li>
                <a href="#section3" class="text-blue-500 hover:underline"
                  >How We Use Cookies</a
                >
              </li>
              <li>
                <a href="#section17" class="text-blue-500 hover:underline"
                  >Security of Your Information
                </a>
              </li>
              <li>
                <a href="#section18" class="text-blue-500 hover:underline"
                  >Policy for Children
                </a>
              </li>
              <li>
                <a href="#section19" class="text-blue-500 hover:underline"
                  >Links to Other Websites and Third Party Practices
                </a>
              </li>
              <li>
                <a href="#section20" class="text-blue-500 hover:underline"
                  >Submitting Information From Outside The United States</a
                >
              </li>
              <li>
                <a href="#section21" class="text-blue-500 hover:underline"
                  >Exercise Your Privacy Rights.
                </a>
              </li>
              <li>
                <a href="#section22" class="text-blue-500 hover:underline"
                  >Retention Period
                </a>
              </li>
              <li>
                <a href="#section23" class="text-blue-500 hover:underline"
                  >Contacting Us
                </a>
              </li>
            </ol>
          </div>

          <div class="mb-4 bg-white shadow-md rounded-lg p-4">
            <p>
              We reserve the right to make changes to this privacy policy
              (“Privacy Policy”) at any time and for any reason. Any changes
              will be reflected in a revised policy posted on the website
              www.hampshirepharmacy.com and we will alert you that there has
              been a change by updating the “Revised” date displayed on the
              Privacy Policy. If Hampshire Pharmacy determines that such changes
              materially affect your privacy rights, we will provide additional
              notice to you.
            </p>
          </div>

          <h6 id="section1" class="text-lg font-semibold mb-2">
            1. Collecting Your Information
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We may collect information about you in a variety of ways but
                generally speaking it is done either through (1) the information
                you provide to us, or (2) the information we collect from you
                via automated means or (3) information we receive from third
                parties. The types of information we may collect include, but
                are not limited to:
              </p>
            </div>
          </div>

          <h6 id="section2" class="text-lg font-semibold mb-2">
            2. Information You Provide To Us
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                This is personal information you choose to provide in connection
                with completing request for a consultation or creating an
                account such as your name, phone number, address, email, or
                other activities in which you participate on the Site or
                services:
              </p>
              <p class="mb-2">
                <strong
                  >We process your personal information for a variety of
                  reasons, depending on how you interact with our Services,
                  including:</strong
                >
              </p>
              <ul class="list-disc pl-5">
                <li class="mb-2">
                  Account registration and administration of your account;
                </li>
                <li class="mb-2">
                  Processing your orders and requests for treatment;
                </li>
                <li class="mb-2">
                  Questions, communications, or feedback you submit to us via
                  forms, email, chat, or telephone;
                </li>
                <li class="mb-2">
                  Your participation in research and surveys;
                </li>
                <li class="mb-2">
                  Requests for customer support and technical assistance,
                  including through online chat functionalities and telephone;
                </li>
                <li class="mb-2">Uploads or posts to the Services;</li>
                <li class="mb-2">
                  Name, address, telephone number, date of birth, and email
                  address;
                </li>
                <li class="mb-2">
                  Information that we may receive from Physicians about your
                  medical conditions, allergies, treatment options, physician
                  referrals, prescriptions, and lab results or other related
                  health information, such as your physical and emotional
                  characteristics;
                </li>
                <li class="mb-2">Log-in credentials;</li>
                <li class="mb-2">
                  Billing information, such as shipping address, credit or debit
                  card number, verification number, expiration date, and
                  identity verification information, collected by our payment
                  processors on our behalf;
                </li>
                <li class="mb-2">
                  Information about purchases or other transactions with us;
                </li>
                <li class="mb-2">
                  Information about your customer service and account
                  maintenance interactions with us
                </li>
                <li class="mb-2">
                  Demographic information such as your gender and age;
                </li>
                <li class="mb-2">
                  Any other information you choose to directly provide to us in
                  connection with you use of the Services.
                </li>
              </ul>
            </div>
          </div>

          <h6 id="section3" class="text-lg font-semibold mb-2">
            3. Information We Collect About You
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                Information our servers automatically collect when you visit,
                use, or browse the Site, such as your IP address, your operating
                system, browser version, the address of a referring website, the
                pages you visit on the Site, the dates and times you visit the
                Site, device and usage information, such as language
                preferences, referring URLs, country, location, information
                about how and when you use our services and other technical
                information. If you access the Site from a mobile device,
                information about the type of mobile device you use. For more
                information about the types of cookies used and their purpose,
                please refer to the cookie policy section below.
              </p>
            </div>
          </div>

          <h6 id="section4" class="text-lg font-semibold mb-2">
            4. Location Information
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                When you use the Services, we and our service providers may
                automatically collect general location information (e.g., IP
                address, city/state and or postal code associated with an IP
                address) from your computer or mobile device. This information
                allows us to enable access to content that varies based on a
                user’s general location. We do not track your precise
                geolocation.
              </p>
            </div>
          </div>

          <h6 id="section5" class="text-lg font-semibold mb-2">
            5. Information We Collect From Social Media and Other Content
            Platforms
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                When you “like” or “follow” us on Facebook, Instagram, Twitter,
                or other social media sites, we may collect some information
                from you including your name, email address, and any comments or
                content you post relevant to us. We also collect your
                information if you sign up for one of our promotions or submit
                information to us through social media sites.
              </p>
            </div>
          </div>

          <h6 id="section6" class="text-lg font-semibold mb-2">
            6. Information We Receive From Other Sources
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We work closely with third parties (including, for example,
                third party intermediaries, such as the physicians, medical
                professionals, and pharmacies with whom we partner to provide
                you with the Services and their health care services,
                sub-contractors in technical, advertising networks, analytics
                providers, and search information providers). Such third parties
                will sometimes provide us with additional information about you.
              </p>
            </div>
          </div>

          <h6 id="section7" class="text-lg font-semibold mb-2">
            7. Understanding HIPAA and Your Protected Health Information.
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                The Health Insurance Portability and Accountability Act of 1996,
                and for the most part similar state laws (collectively “HIPAA”)
                applies to specific types of “covered entities”; it does not
                automatically apply to data even if that data is health or
                medical data.
                <br />
                <br />
                Covered Entities under HIPAA are healthcare providers (doctors,
                clinics, dentists etc.), health plans (e.g, insurance companies)
                and healthcare clearing houses (specialized entities within the
                healthcare payments supply chain).
                https://hampshirepharmacy.com/ is an ecommerce platform that
                does not meet any of those definitions and is therefore not a
                covered entity under HIPAA. As such, any data you provide to us,
                even health or medical data, is as between you and Hampshire
                Pharmacy protected by this Privacy Policy instead of HIPAA.
                However, once accessed by or in the pharmacy, that data becomes
                subject to HIPAA because those entities are (with some
                exceptions) “covered entities” under HIPAA.
              </p>
            </div>
          </div>

          <h6 id="section8" class="text-lg font-semibold mb-2">
            8. What does this mean for you in practical terms?
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                When you view our Site, sign-up for newsletters or otherwise
                provide data before you create an account, you are interacting
                solely and directly with Hampshire Pharmacy and no data you
                provide is subject to HIPAA.
              </p>
              <p class="mb-2">
                Similarly, when you create an account, the basic information you
                provide, like your name, email address, shipping address, phone
                number, and some transactional data, is not “protected health
                information” subject to HIPAA.
              </p>

              <p class="mb-2">
                When you take the next step after creating an account and begin
                the process of submitting information about conditions or issues
                you may want addressed by the products available on our Site,
                the information you provide will be accessed by a licensed
                healthcare provider. That access and the subsequent analysis and
                communications between you and the provider create a
                provider-patient relationship that Hampshire Pharmacy is not
                involved in. The licensed provider will make available to you
                their Notices of Privacy Practices and other HIPAA required
                documents that are separate from this privacy policy.
              </p>
            </div>
          </div>

          <h6 id="section9" class="text-lg font-semibold mb-2">
            9. Using Your Information
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                Over the past 12 months, the information we have collected from
                you and the information you have provided to us has been used
                for the following purposes:
              </p>
            </div>
          </div>

          <h6 id="section10" class="text-lg font-semibold mb-2">
            10. General Use
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                Hampshire Pharmacy will use your information as necessary to
                carry out and manage its Services. This includes, using your
                information to verify and administer your account, including
                processing payments and fulfilling orders (if applicable). We
                will use your information to communicate with you about
                Hampshire Pharmacy's Services, your use of the Services or your
                inquiries related to the Services. Hampshire Pharmacy will use
                your information to ensure that content from our Services is
                presented in the most effective manner for you and for your
                computer or device, allow you to participate in interactive
                features of our Services (when you choose to do so), and as part
                of our efforts to keep our Services safe and secure.
              </p>
            </div>
          </div>

          <h6 id="section11" class="text-lg font-semibold mb-2">
            11. Improve Hampshire Pharmacy's Services
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                Hampshire Pharmacy continuously seeks to improve its Services.
                To do so, we conduct research to understand the effectiveness of
                our Services, improve our Services, and to better understand the
                Hampshire Pharmacy community. If we publish the results of our
                research to others, such research will be presented in a
                de-identified and aggregate form such that individual users
                cannot be identified.
              </p>
            </div>
          </div>

          <h6 id="section12" class="text-lg font-semibold mb-2">
            12. Promotional Communications
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We will use your personal information to communicate with you by
                email, postal mail, phone, or text message about surveys,
                promotions, special events or our products and Services and
                those of our affiliates or third-party partners, and any of
                their related businesses. By creating an account and using this
                Website, you are giving your express permission to Hampshire
                Pharmacy and their agents or vendors the right to contact you
                with targeted advertising materials by email, text message
                (SMS), telephone or cellphone, including the use of automated,
                predictive, programmable, or similar ("robodialers") dialers or
                dialing software, or any other means of communication to provide
                promotional offers.
              </p>
            </div>
          </div>

          <h6 id="section13" class="text-lg font-semibold mb-2">
            13. Marketing/Performance Analysis & Data Analytics
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We will use your information to help us better understand your
                interests and needs, such as by engaging in analysis and
                research regarding use of the Services. We may use your
                information to measure or understand the effectiveness of
                advertising and content we serve to you and others, and to
                deliver and customize relevant advertising and content to you.
              </p>
            </div>
          </div>

          <h6 id="section14" class="text-lg font-semibold mb-2">
            14. Combined Information
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                For the purposes discussed in this Privacy Policy, we may
                combine the information that we collect through the Services
                with information that we receive from other sources, both online
                and offline, and use and share such combined information in
                accordance with this Privacy Policy. We shall never combine the
                health data of two unrelated users.
              </p>
            </div>
          </div>

          <h6 id="section15" class="text-lg font-semibold mb-2">
            15. Aggregate/De-Identified Data
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We may aggregate and/or de-identify any information collected
                through the Services so that such information can no longer be
                linked to you or your device ("Aggregate/De-Identified
                Information"). We may use Aggregate/De-Identified Information
                for any purpose, including for research and marketing purposes,
                and may also share such data with any third parties, including
                advertisers, promotional partners, and sponsors. We may receive
                monetary and/or other compensation for sharing
                Aggregate/De-Identified Information with such third parties.
              </p>
            </div>
          </div>

          <h6 id="section16" class="text-lg font-semibold mb-2">
            16. Sharing Your Information
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We may share your information with third parties that perform
                services for or on our behalf for business purposes that
                include:
              </p>
              <ul class="list-disc pl-5">
                <li class="mb-2">
                  Healthcare Providers - We may share your information with
                  healthcare providers in order to schedule and fulfill
                  appointments so that the healthcare providers may provide
                  medical evaluations or personalized consultations.
                </li>
                <li class="mb-2">
                  Affiliates & Related Business Entities - We may share the
                  information we collect with our affiliates or related business
                  entities.
                </li>
                <li class="mb-2">
                  Service Providers and Third Party Partners - We may allow
                  selected service providers or processors to analyze your
                  online activity.
                </li>
                <li class="mb-2">
                  Transfer of Assets - If we reorganize or transfer some or all
                  of the Site or our assets to another organization.
                </li>
                <li class="mb-2">
                  Security and Fraud - We allow third parties to receive
                  personal information to provide security and fraud protection.
                </li>
                <li class="mb-2">
                  Required By Law - We may share your information as permitted
                  or required by any applicable law.
                </li>
              </ul>
            </div>
          </div>

          <h6 id="section17" class="text-lg font-semibold mb-2">
            17. Security of Your Information
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We have adopted, implemented, and maintain an enterprise-wide
                corporate information security and privacy program that includes
                technical, organizational, administrative, and other security
                measures designed to protect, as required by applicable law,
                against reasonably anticipated or actual threats to the security
                of your personal information (the "Security Program"). Our
                Security Program was created with reference to the obligations
                set forth under the Health Insurance Portability and
                Accountability Act ("HIPAA").
              </p>
              <p class="mb-2">
                It includes, among many other things, procedures for assessing
                the need for, and as appropriate, either employing encryption
                and multi-factor authentication or using equivalent compensating
                controls. We therefore have every reason to believe our Security
                Program is reasonable and appropriate for our business and the
                nature of foreseeable risks to the personal information we
                collect. We further periodically review and update our Security
                Program, including as required by applicable law.
              </p>
              <p class="mb-2">
                Despite the significant investment we've made in, and our
                commitment to, the Security Program we cannot guarantee that
                your personal information, whether during transmission or while
                stored on our systems, otherwise in our care, or the care of our
                third-party vendors and service providers, will be free from
                either failed or successful attempts at unauthorized access or
                that loss or accidental destruction will never occur.
              </p>
            </div>
          </div>

          <h6 id="section18" class="text-lg font-semibold mb-2">
            18. Policy for Children
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We do not use the Site to solicit information from or market to
                children under the age of 18. By using the Site, you represent
                that you are at least 18 years of age. We encourage parents and
                legal guardians to monitor their children's internet usage and
                to instruct their children never to provide personal information
                through the Site or any other website without parental consent.
                If you believe a child has provided personal information to us
                via the Site, please contact us and we will use reasonable
                efforts to locate and delete the information.
              </p>
            </div>
          </div>

          <h6 id="section19" class="text-lg font-semibold mb-2">
            19. Links to Other Websites and Third Party Practices
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                The Site may contain links to third party websites. It is our
                intent to provide links only to other quality websites. However,
                we have no control over these linked websites or, for that
                matter, any third parties. Any information collected by
                websites, other than the Site, is not covered by this Privacy
                Policy. We are not responsible for the content or privacy and
                security practices and policies of any third parties, including
                other websites that may be linked to or from the Site. We
                encourage you to read the provisions of privacy policies on
                other websites before providing them with your personal
                information.
              </p>
            </div>
          </div>

          <h6 id="section20" class="text-lg font-semibold mb-2">
            20. Submitting Information From Outside The United States
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                We control and operate the online and mobile resources from
                within the United States of America (the "U.S."). Information
                collected through the Site may be stored and processed in the
                United States or any other country in which our vendors or we
                maintain facilities. Although we do not actively block or
                monitor visitors from other countries, the Site is directed only
                at visitors from the U.S.
              </p>
              <p class="mb-2">
                As such, this Privacy Policy is consistent with U.S. law and
                practice and is not adapted to other laws (including European
                data security and privacy laws). Hampshire Pharmacy will apply
                the applicable laws of the U.S., including as embodied in this
                Privacy Policy in place of data protections under your home
                country's law. That is, you freely and unambiguously acknowledge
                that this Privacy Policy, not your home country's laws, controls
                how we will collect, store, process, and transfer your personal
                information.
              </p>
            </div>
          </div>

          <h6 id="section21" class="text-lg font-semibold mb-2">
            21. Exercise Your Privacy Rights
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                Hampshire Pharmacy takes privacy seriously. Where applicable
                under a Comprehensive Privacy Law, data subjects have certain
                rights which they can request for Hampshire Pharmacy to fulfill.
                These requests can be made by either the data subject or an
                authorized agent. These rights include:
              </p>
              <ul class="list-disc pl-5">
                <li class="mb-2">
                  The Right to Know. You have the right to request that
                  Hampshire Pharmacy disclose the personal data that Hampshire
                  Pharmacy has collected about you.
                </li>
                <li class="mb-2">
                  The Right to Amend. You have the right to correct any
                  information that Hampshire Pharmacy stores about you;
                </li>
                <li class="mb-2">
                  The Right to Delete. You have the right to request that
                  Hampshire Pharmacy delete information that it maintains about
                  you, subject to certain exceptions;
                </li>
                <li class="mb-2">
                  The Right to Opt Out Of Your Personal Information Being Sold
                  or Shared. We do not sell or share your personal information.
                </li>
              </ul>
              <p class="mb-2">
                In order to exercise any of the rights detailed above, please
                contact us at hampshirepharmacy@gmail.com. We will use your
                email as proof of verification unless otherwise prohibited.
                Exercising your rights under this section will not result in any
                discrimination by Hampshire Pharmacy.
              </p>
            </div>
          </div>

          <h6 id="section22" class="text-lg font-semibold mb-2">
            22. Retention Period
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                Hampshire Pharmacy shall only store personal information for as
                long as it is required. This is determined by considering the
                purposes for which it was obtained in accordance with applicable
                laws. Our retention period is based on (1) the nature of our
                relationship with the data subject and (2) any legal obligations
                we are bound to fulfill.
              </p>
            </div>
          </div>

          <h6 id="section23" class="text-lg font-semibold mb-2">
            23. Contact Us
          </h6>
          <div class="bg-white shadow-md rounded-lg mb-4">
            <div class="p-4">
              <p class="mb-2">
                If you have questions or comments about this Privacy Policy,
                please email us at: hampshirepharmacy@gmail.com.
              </p>
              <p class="mb-2">If you prefer, you may also contact us via:</p>
              <p class="mb-2">
                Hampshire Pharmacy<br />
                262 N State Street<br />
                Hampshire, IL 60140
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script setup>
import { ref, nextTick } from "vue";
import AppHeader from "../components/layout/appHeader.vue";
import SearchBar from "../components/searchBar.vue";
import AppFooter from "~/components/layout/appFooter.vue";

useHead({
  title: "Privacy Policy | Hampshire Pharmacy",
  meta: [
    {
      name: "description",
      content:
        "Learn how we protect your personal and health information, data collection practices, and your privacy rights. Our detailed privacy policy explains how we use, store, and safeguard your information.",
    },
    {
      name: "keywords",
      content:
        "pharmacy privacy policy, HIPAA compliance, data protection, privacy rights, information security, personal data protection, healthcare privacy, patient privacy, data collection policy, privacy notice",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Privacy Policy | Hampshire Pharmacy",
    },
    {
      property: "og:description",
      content:
        "Learn how we protect your personal and health information, data collection practices, and your privacy rights. Our detailed privacy policy explains how we use, store, and safeguard your information.",
    },
    // Twitter
    {
      name: "twitter:title",
      content: "Privacy Policy | Hampshire Pharmacy",
    },
    {
      name: "twitter:description",
      content:
        "Learn how we protect your personal and health information, data collection practices, and your privacy rights. Our detailed privacy policy explains how we use, store, and safeguard your information.",
    },
  ],
});

const errorText = ref("");
const medData = ref([]); // Initialize as an empty array

async function handleSubmit(searchTerm) {
  if (searchTerm.length < 3) {
    errorText.value = "Please input at least 3 characters";
    return;
  }

  errorText.value = "";

  const res = await $fetch("/api/medications/findMed", {
    query: { searchTerm },
    method: "GET",
  });

  if (res.length === 0) {
    errorText.value =
      "Sorry, we couldn't find your medication, please call us at (847)-683-2244";
    medData.value = [];
    return;
  }
  medData.value = res;
  nextTick(() => {
    const resultsElement = document.getElementById("searchResults");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
</script>
