import Embed from '../../components/Embed';
import attributes from './attributes';
import edit from './edit';
import { translations } from '../../config';

const { Path, SVG } = wp.components;
const { __ } = wp.i18n;

export default {
    name: `${namespace}/store`,
    settings: {
        title: translations[namespace].store,
        description: __('Embed your whole store.'),
        category: `${namespace}-ecommerce`,
        icon: (
            <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <Path fill="url(#logo-gradient-a)" d="M21.5454545,7.54064935 L19.4383117,4.17701299 C19.25,3.87506494 18.9155844,3.69 18.5584416,3.69 L5.44155844,3.69 C5.08441558,3.69 4.75,3.87506494 4.56168831,4.17701299 L2.45454545,7.54064935 C1.49350649,9.07311688 2.12987013,11.1315584 3.68831169,11.7874026 L3.68831169,19.1705195 C3.68831169,19.8003896 4.1525974,20.3133766 4.72727273,20.3133766 L19.2727273,20.3133766 C19.8474026,20.3133766 20.3116883,19.8003896 20.3116883,19.1705195 L20.3116883,11.7874026 C21.8701299,11.1315584 22.5064935,9.07311688 21.5454545,7.54064935 Z M18.7532468,18.7549351 L5.24675325,18.7549351 L5.24675325,15.6380519 L18.7532468,15.6380519 L18.7532468,18.7549351 Z M18.7532468,14.0731169 L5.24675325,14.0731169 L5.24675325,11.9724675 C6.02597403,11.8653247 6.71103896,11.478961 7.20454545,10.927013 C7.78896104,11.5796104 8.64285714,12.0016883 9.60064935,12.0016883 C10.5616883,12.0016883 11.4123377,11.5796104 11.9967532,10.927013 C12.5811688,11.5796104 13.4350649,12.0016883 14.3928571,12.0016883 C15.3538961,12.0016883 16.2045455,11.5796104 16.788961,10.927013 C17.2857143,11.478961 17.9675325,11.8653247 18.7467532,11.9724675 L18.7467532,14.0731169 L18.7532468,14.0731169 Z M20.3019481,9.75493506 C20.1980519,9.97571429 19.9480519,10.3588312 19.4253247,10.4302597 C19.3474026,10.44 19.2694805,10.4464935 19.1915584,10.4464935 C18.7142857,10.4464935 18.275974,10.2484416 17.9545455,9.88805195 L16.7954545,8.5925974 L15.6363636,9.88480519 C15.3149351,10.2451948 14.8733766,10.4432468 14.3993506,10.4432468 C13.9253247,10.4432468 13.4837662,10.2451948 13.1623377,9.88480519 L12,8.5925974 L10.8409091,9.88480519 C10.5194805,10.2451948 10.0779221,10.4432468 9.6038961,10.4432468 C9.12662338,10.4432468 8.68831169,10.2451948 8.36688312,9.88480519 L7.20454545,8.5925974 L6.04545455,9.88480519 C5.72402597,10.2451948 5.28246753,10.4432468 4.80844156,10.4432468 C4.72727273,10.4432468 4.64935065,10.4367532 4.57467532,10.427013 C4.05519481,10.3555844 3.80194805,9.97571429 3.69805195,9.75168831 C3.53571429,9.40103896 3.46753247,8.85558442 3.77272727,8.36857143 L5.72727273,5.24844156 L18.2694805,5.24844156 L20.224026,8.36857143 C20.5324675,8.85883117 20.4675325,9.40428571 20.3019481,9.75493506 Z" />
            </SVG>
        ),
        attributes,
        supports: {
            multiple: false,
        },
        edit,
        save: props => <Embed {...props} />,
    },
};
