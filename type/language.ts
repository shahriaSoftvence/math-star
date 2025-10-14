export interface Header {
    logo_alt: string;
    what_is_math_star: string;
    pricing: string;
    faq: string;
    german_flag_alt: string;
    usa_flag_alt: string;
    dashboard: string;
    logout: string;
    sign_in: string;
};

export interface LanguageType {
    homepage?: {
        hero: {
            title_line1: string;
            title_line2: string;
            description: string;
            sign_up: string;
            sign_in: string;
            image_alt: string;
        };
        features: {
            title1: string;
            title2: string;
            description: string;
            items: {
                title: string;
                description: string;
                highlight?: string;
                operations?: string[];
            }[];
        };
        pricing: {
            title: string;
            description: string;
            plan_name: string;
            features: string[];
            trial_button: string;
            subscribed_button: string;
            no_card_required: string;
            contact_text: string;
            contact_link: string;
        };
        faq: {
            title: string;
            description: string;
            questions: {
                question: string;
                answer: string;
            }[];
            support_text: string;
            support_button: string;
        };
    };
    signin: {
        title: string;
        subtitle: string;
        email_placeholder: string;
        password_placeholder: string;
        forgot_password: string;
        sign_in: string;
        signing_in: string;
        no_account: string;
        signup: string;
        login_success: string;
        login_failed: string;
        fill_all_fields: string;
    };
    signup: {
        title: string;
        full_name_placeholder: string;
        email_placeholder: string;
        password_placeholder: string;
        confirm_password_placeholder: string;
        password_mismatch: string;
        password_short: string;
        terms_text: string;
        terms_link: string;
        age_checkbox: string;
        next: string;
        creating_account: string;
        have_account: string;
        signin: string;
        registration_success: string;
        registration_failed: string;

        otp_title: string;
        otp_sent: string;
        otp_placeholder: string;
        verifying: string;
        verify_otp: string;
        otp_success: string;
        otp_failed: string;
        resend_text: string;
        resend: string;
        resending: string;
        resend_success: string;
        resend_failed: string;
        back_to_registration: string;
    };
    forgot_password: {
        title: string;
        subtitle: string;
        email_placeholder: string;
        send_reset_code: string;
        sending: string;
        reset_code_sent: string;
        reset_code_description: string;
        reset_failed: string;

        enter_code_title: string;
        enter_code_subtitle: string;
        code_placeholder: string;
        verify_code: string;
        verifying: string;
        code_verified: string;
        code_verified_description: string;
        verification_failed: string;
        invalid_code: string;

        set_password_title: string;
        set_password_subtitle: string;
        new_password_placeholder: string;
        confirm_password_placeholder: string;
        change_password: string;
        changing: string;
        password_changed: string;
        password_changed_description: string;
        password_change_failed: string;

        success_title: string;
        success_subtitle: string;
        sign_in: string;

        back: string;
        returned_to_email: string;
        returned_to_email_description: string;
        returned_to_code: string;
        returned_to_code_description: string;

        validation: {
            email_required: string;
            code_required: string;
            password_required: string;
            password_mismatch: string;
            password_mismatch_description: string;
            password_short: string;
            password_short_description: string;
        };

        check_email: {
            title: string;
            description: string;
            open_email: string;
            resend_text: string;
            resend_link: string;
        };

        confirm_password: {
            title: string;
            password_placeholder: string;
            confirm_password_placeholder: string;
            reset_button: string;
        };
    }

    navbar: {
        greeting: string;
        loading: string;
        stars_text: string;
        reward_text: string;
        profile: string;
        logout: string;
        toggle_sidebar: string;
        profile_menu: string;
        country_flag_alt: string;
        user_avatar_alt: string;
        reward_icon_alt: string;
    };
    header?: Header;
    sidebar?: {
        dashboard: string;
        profile: string;
        settings: string;
        subscription: string;
        sign_in: string;
    },
    footer: {
        logo_alt: string;
        description: string;
        quick_links_title: string;
        home: string;
        how_it_works: string;
        pricing: string;
        support_title: string;
        privacy_policy: string;
        terms_conditions: string;
        faqs: string;
        contact_us: string;
        copyright: string;
    };
    dashboard: {
        loading: string;
        error_message: string;
        practice_section: {
            addition: { title: string; description: string };
            subtraction: { title: string; description: string };
            multiplication: { title: string; description: string };
            division: { title: string; description: string };
        };
        progress_section: {
            title: string;
            practice_time: string;
            minutes: string;
            stars_earned: string;
            best_challenge_score: string;
            daily_goal_progress: string;
        };
        activity_section: {
            title: string;
            no_activity: string;
        };
        star_balance: {
            title: string;
            top_up_message: string;
            badge_alt: string;
        };
    };
    operations: {
        addition: {
            name: string;
            symbol: string;
            color: string;
            terms: { carry: string; no_carry: string };
        };
        subtraction: {
            name: string;
            symbol: string;
            color: string;
            terms: { borrow: string; no_borrow: string };
        };
        multiplication: {
            name: string;
            symbol: string;
            color: string;
            terms: { basic: string; extended: string };
        };
        division: {
            name: string;
            symbol: string;
            color: string;
            terms: { basic: string; remainder: string };
        };
    };
    shared: {
        navigation: {
            go_back: string;
            cancel: string;
        };
        exercise_section: {
            title: string;
            number_range: string;
            continue_with: string;
            go: string;
            selected_ranges: string;
        };
        challenge_section: {
            title: string;
            no_high_score: string;
            high_score: string;
            problems: string;
            minutes: string;
            challenges: {
                no_mistake: { title: string; description: string };
                speed_mode: { title: string; description: string };
                hundred_questions: { title: string; description: string };
                whats_missing: { title: string; description: string };
            };
        };
        challenge_cards: {
            display_top_score: string;
            no_high_score: string;
        };
        select_questions: {
            title: string;
            questions: string;
            practice_tips: string;
            tips: string[];
        };
        practice: {
            title: string;
            progress: string;
            help_chart: string;
            reset: string;
            of: string;
            feedback: {
                correct: { title: string; message: string };
                incorrect: { title: string; message: string };
            };
        };
        challenge_screens: {
            ready_screen: {
                title: string;
                descriptions: {
                    hundred_questions: string;
                    no_mistake: string;
                    speed_mode: string;
                    whats_missing: string;
                };
                start_button: string;
            };
            game_elements: {
                timer: { remaining: string; time_format: string };
                question: string;
                score: string;
                status_indicators: { current: string; correct: string; wrong: string };
            };
            instructions: {
                title1: string;
                no_mistake: string;
                title2: string;
                speed_mode: string;
                title3: string;
                hundred_questions: string;
                title4: string;
                whats_missing: string;
            };
        };
        results: {
            questions_answered: string;
            save_success: string;
            save_error: string;
            practice_saved: string;
            practice_failed: string;
        };
        loading: {
            loading_practice: string;
            loading: string;
        };
    };

    numpad: {
        backspace: string;
        submit: string;
    };


    profile: {
        page_title: string;
        user_info: {
            math_star_level: string;
            keep_practicing: string;
            edit_profile: string;
            math_star_millionaire: string
        };
        achievements: {
            title: string;
            see_more: string;
            see_less: string;
            empty_state: string;
        };
        subscription: {
            title: string;
            active: string;
            inactive: string;
            manage_subscription: string;
        };
        notifications: {
            image_upload_success: string;
            image_upload_error: string;
            profile_update_success: string;
            profile_update_error: string;
        };
        buttons: {
            edit: string;
            save: string;
            cancel: string;
            upload_photo: string;
        };
        labels: {
            name: string;
            email: string;
            grade: string;
            stars: string;
            level: string;
            join_date: string;
        };
        navigation: {
            back: string;
            settings: string;
            dashboard: string;
        };
    };
    rewards: {
        page_title: string;
        star_balance: string;
        loading: string;
        error_message: string;
        rewards_list: {
            empty_state: string;
        };
        reward_card: {
            unlocked: string;
            locked: string;
            stars_required: string;
            unlock_message: string;
            achieved_message: string;
        };
        navigation: {
            back: string;
        };
    };
    settings: {
        page_title: string;
        sections: {
            personal_info: {
                title: string;
                edit_button: string;
                save_button: string;
                fields: {
                    email: string;
                    name: string;
                    math_star_name: string;
                };
            };
            change_password: {
                title: string;
                current_password: string;
                new_password: string;
                confirm_password: string;
                placeholders: {
                    current_password: string;
                    new_password: string;
                    confirm_password: string;
                };
                submit_button: string;
                loading_button: string;
            };
            about: {
                title: string;
                version: string;
                description: string;
            };
        };
        notifications: {
            profile_update_success: string;
            profile_update_error: string;
            password_change_success: string;
            password_change_error: string;
            validation_errors: {
                passwords_mismatch: string;
                password_too_short: string;
                same_password: string;
            };
        };
        navigation: {
            back: string;
        };
    };
    subscription: {
        page_title: string;
        subtitle: string;
        loading: string;
        auto_renewal: {
            title: string;
            description: string;
            next_charge: string;
        };
        quick_actions: {
            title: string;
            renew_now: string;
            renewing: string;
        };
        payment_methods: {
            title: string;
            add_card: string;
            no_methods: string;
            card_display: string;
            expires: string;
            default: string;
            remove_card: string;
            remove_dialog: {
                title: string;
                description: string;
                cancel: string;
                confirm: string;
            };
        };
        billing_history: {
            title: string;
            empty_state: string;
            see_more: string;
            see_less: string;
            status: {
                paid: string;
                pending: string; failed: string;
            };
            free_plan: string;
        };
        notifications: {
            subscription_renewed: string;
            auto_renewal_updated: string;
            payment_method_added: string;
            payment_method_removed: string;
            errors: {
                renew_failed: string;
                auto_renew_failed: string;
                add_payment_failed: string;
                remove_payment_failed: string;
            };
        };
        navigation: {
            back: string;
        };
    };
    congratulations_screen: {
        title: string;
        earned_message: string;
        encouragement: string;
        buttons: {
            view_all_rewards: string;
            continue_learning: string;
        };
        accessibility: {
            medal_icon: string;
            star_icon: string;
        };
    };
    game_result_screen: {
        title: string;
        final_score: string;
        questions_answered: string;
        buttons: {
            try_again: string;
            continue: string;
        };
        accessibility: {
            close_button: string;
        };
    };
    password_changed_popup: {
        title: string;
        message: string;
        button: string;
    };
    subscription_card: {
        title: string;
        no_plan: string;
        free_trial: string;
        renews_on: string;
        actions: {
            cancel_subscription: string;
            buy_subscription: string;
            loading: string;
        };
        cancel_dialog: {
            title: string;
            description: string;
            cancel: string;
            confirm: string;
        };
        notifications: {
            subscription_cancelled: string;
            cancel_failed: string;
        };
        payment_pages: {
            cancel: {
                title: string;
                message: string;
                button: string;
            };
            card_error: {
                title: string;
                message: string;
                button: string;
            };
            card_success: {
                title: string;
                message: string;
                button: string;
            };
            success: {
                title: string;
                message: string;
                button: string;
            };
        };
    };
};