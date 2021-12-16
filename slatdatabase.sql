PGDMP     :                    y            slat    13.3    13.3 �    s           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            t           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            u           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            v           1262    43966    slat    DATABASE     h   CREATE DATABASE slat WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE slat;
                postgres    false            �           1247    77278    QuestionLevel    TYPE     h   CREATE TYPE public."QuestionLevel" AS ENUM (
    'Easy',
    'Medium',
    'Difficult',
    'Expert'
);
 "   DROP TYPE public."QuestionLevel";
       public          postgres    false            �           1247    83120    UserRole    TYPE     C   CREATE TYPE public."UserRole" AS ENUM (
    'User',
    'Admin'
);
    DROP TYPE public."UserRole";
       public          postgres    false            �            1259    80549    AnswerSheet    TABLE     C  CREATE TABLE public."AnswerSheet" (
    id integer NOT NULL,
    "userTestId" integer NOT NULL,
    "questionId" integer NOT NULL,
    "answerId" integer,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 !   DROP TABLE public."AnswerSheet";
       public         heap    postgres    false            �            1259    80547    AnswerSheet_id_seq    SEQUENCE     �   CREATE SEQUENCE public."AnswerSheet_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."AnswerSheet_id_seq";
       public          postgres    false    226            w           0    0    AnswerSheet_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."AnswerSheet_id_seq" OWNED BY public."AnswerSheet".id;
          public          postgres    false    225            �            1259    78563    ExamineeList    TABLE     �   CREATE TABLE public."ExamineeList" (
    id integer NOT NULL,
    title text NOT NULL,
    description text,
    "userId" integer NOT NULL
);
 "   DROP TABLE public."ExamineeList";
       public         heap    postgres    false            �            1259    78561    ExamineeList_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ExamineeList_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."ExamineeList_id_seq";
       public          postgres    false    218            x           0    0    ExamineeList_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."ExamineeList_id_seq" OWNED BY public."ExamineeList".id;
          public          postgres    false    217            �            1259    60472    Option    TABLE     �   CREATE TABLE public."Option" (
    id integer NOT NULL,
    text text NOT NULL,
    "questionId" integer NOT NULL,
    "isCorrect" boolean NOT NULL
);
    DROP TABLE public."Option";
       public         heap    postgres    false            �            1259    60470    Option_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Option_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Option_id_seq";
       public          postgres    false    210            y           0    0    Option_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Option_id_seq" OWNED BY public."Option".id;
          public          postgres    false    209            �            1259    60461    Question    TABLE     �  CREATE TABLE public."Question" (
    id integer NOT NULL,
    text text NOT NULL,
    "userId" integer NOT NULL,
    level public."QuestionLevel" DEFAULT 'Easy'::public."QuestionLevel" NOT NULL,
    randomize boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Question";
       public         heap    postgres    false    682    682            �            1259    77293    QuestionPaper    TABLE     I  CREATE TABLE public."QuestionPaper" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    title text NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    duration integer DEFAULT 60 NOT NULL
);
 #   DROP TABLE public."QuestionPaper";
       public         heap    postgres    false            �            1259    77307    QuestionPaperTopic    TABLE     �   CREATE TABLE public."QuestionPaperTopic" (
    id integer NOT NULL,
    "paperId" integer NOT NULL,
    "topicId" integer NOT NULL,
    level public."QuestionLevel" NOT NULL,
    "numberOfQuestions" integer NOT NULL
);
 (   DROP TABLE public."QuestionPaperTopic";
       public         heap    postgres    false    682            �            1259    77305    QuestionPaperTopic_id_seq    SEQUENCE     �   CREATE SEQUENCE public."QuestionPaperTopic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."QuestionPaperTopic_id_seq";
       public          postgres    false    216            z           0    0    QuestionPaperTopic_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."QuestionPaperTopic_id_seq" OWNED BY public."QuestionPaperTopic".id;
          public          postgres    false    215            �            1259    77291    QuestionPaper_id_seq    SEQUENCE     �   CREATE SEQUENCE public."QuestionPaper_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."QuestionPaper_id_seq";
       public          postgres    false    214            {           0    0    QuestionPaper_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."QuestionPaper_id_seq" OWNED BY public."QuestionPaper".id;
          public          postgres    false    213            �            1259    69016    QuestionTopic    TABLE     �   CREATE TABLE public."QuestionTopic" (
    id integer NOT NULL,
    "topicId" integer NOT NULL,
    "questionId" integer NOT NULL
);
 #   DROP TABLE public."QuestionTopic";
       public         heap    postgres    false            �            1259    69014    QuestionTopic_id_seq    SEQUENCE     �   CREATE SEQUENCE public."QuestionTopic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."QuestionTopic_id_seq";
       public          postgres    false    212            |           0    0    QuestionTopic_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."QuestionTopic_id_seq" OWNED BY public."QuestionTopic".id;
          public          postgres    false    211            �            1259    60459    Question_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Question_id_seq";
       public          postgres    false    208            }           0    0    Question_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Question_id_seq" OWNED BY public."Question".id;
          public          postgres    false    207            �            1259    60439    Subject    TABLE     s   CREATE TABLE public."Subject" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL
);
    DROP TABLE public."Subject";
       public         heap    postgres    false            �            1259    60437    Subject_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Subject_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Subject_id_seq";
       public          postgres    false    204            ~           0    0    Subject_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Subject_id_seq" OWNED BY public."Subject".id;
          public          postgres    false    203            �            1259    79410    Test    TABLE     �  CREATE TABLE public."Test" (
    id integer NOT NULL,
    title text NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL,
    "userId" integer NOT NULL,
    "paperId" integer NOT NULL,
    "listId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public."Test";
       public         heap    postgres    false            �            1259    79408    Test_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Test_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Test_id_seq";
       public          postgres    false    222                       0    0    Test_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Test_id_seq" OWNED BY public."Test".id;
          public          postgres    false    221            �            1259    60450    Topic    TABLE     �   CREATE TABLE public."Topic" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "subjectId" integer NOT NULL
);
    DROP TABLE public."Topic";
       public         heap    postgres    false            �            1259    60448    Topic_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Topic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Topic_id_seq";
       public          postgres    false    206            �           0    0    Topic_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Topic_id_seq" OWNED BY public."Topic".id;
          public          postgres    false    205            �            1259    43993    User    TABLE     T  CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    otp text,
    "otpExpiry" timestamp(3) without time zone,
    role public."UserRole" DEFAULT 'User'::public."UserRole" NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false    716    716            �            1259    78574    UserExamineeList    TABLE     �   CREATE TABLE public."UserExamineeList" (
    id integer NOT NULL,
    "listId" integer NOT NULL,
    "userId" integer NOT NULL
);
 &   DROP TABLE public."UserExamineeList";
       public         heap    postgres    false            �            1259    78572    UserExamineeList_id_seq    SEQUENCE     �   CREATE SEQUENCE public."UserExamineeList_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."UserExamineeList_id_seq";
       public          postgres    false    220            �           0    0    UserExamineeList_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."UserExamineeList_id_seq" OWNED BY public."UserExamineeList".id;
          public          postgres    false    219            �            1259    80541    UserTest    TABLE     �   CREATE TABLE public."UserTest" (
    id integer NOT NULL,
    "testId" integer NOT NULL,
    "userId" integer NOT NULL,
    "endTime" timestamp(3) without time zone,
    "startTime" timestamp(3) without time zone
);
    DROP TABLE public."UserTest";
       public         heap    postgres    false            �            1259    80539    UserTest_id_seq    SEQUENCE     �   CREATE SEQUENCE public."UserTest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."UserTest_id_seq";
       public          postgres    false    224            �           0    0    UserTest_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."UserTest_id_seq" OWNED BY public."UserTest".id;
          public          postgres    false    223            �            1259    43991    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    202            �           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    201            �            1259    43981    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            �           2604    80552    AnswerSheet id    DEFAULT     t   ALTER TABLE ONLY public."AnswerSheet" ALTER COLUMN id SET DEFAULT nextval('public."AnswerSheet_id_seq"'::regclass);
 ?   ALTER TABLE public."AnswerSheet" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    78566    ExamineeList id    DEFAULT     v   ALTER TABLE ONLY public."ExamineeList" ALTER COLUMN id SET DEFAULT nextval('public."ExamineeList_id_seq"'::regclass);
 @   ALTER TABLE public."ExamineeList" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    60475 	   Option id    DEFAULT     j   ALTER TABLE ONLY public."Option" ALTER COLUMN id SET DEFAULT nextval('public."Option_id_seq"'::regclass);
 :   ALTER TABLE public."Option" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    60464    Question id    DEFAULT     n   ALTER TABLE ONLY public."Question" ALTER COLUMN id SET DEFAULT nextval('public."Question_id_seq"'::regclass);
 <   ALTER TABLE public."Question" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    208    208            �           2604    77296    QuestionPaper id    DEFAULT     x   ALTER TABLE ONLY public."QuestionPaper" ALTER COLUMN id SET DEFAULT nextval('public."QuestionPaper_id_seq"'::regclass);
 A   ALTER TABLE public."QuestionPaper" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    77310    QuestionPaperTopic id    DEFAULT     �   ALTER TABLE ONLY public."QuestionPaperTopic" ALTER COLUMN id SET DEFAULT nextval('public."QuestionPaperTopic_id_seq"'::regclass);
 F   ALTER TABLE public."QuestionPaperTopic" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    69019    QuestionTopic id    DEFAULT     x   ALTER TABLE ONLY public."QuestionTopic" ALTER COLUMN id SET DEFAULT nextval('public."QuestionTopic_id_seq"'::regclass);
 A   ALTER TABLE public."QuestionTopic" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    60442 
   Subject id    DEFAULT     l   ALTER TABLE ONLY public."Subject" ALTER COLUMN id SET DEFAULT nextval('public."Subject_id_seq"'::regclass);
 ;   ALTER TABLE public."Subject" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    204    204            �           2604    79413    Test id    DEFAULT     f   ALTER TABLE ONLY public."Test" ALTER COLUMN id SET DEFAULT nextval('public."Test_id_seq"'::regclass);
 8   ALTER TABLE public."Test" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    60453    Topic id    DEFAULT     h   ALTER TABLE ONLY public."Topic" ALTER COLUMN id SET DEFAULT nextval('public."Topic_id_seq"'::regclass);
 9   ALTER TABLE public."Topic" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    205    206                       2604    43996    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    202    202            �           2604    78577    UserExamineeList id    DEFAULT     ~   ALTER TABLE ONLY public."UserExamineeList" ALTER COLUMN id SET DEFAULT nextval('public."UserExamineeList_id_seq"'::regclass);
 D   ALTER TABLE public."UserExamineeList" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    80544    UserTest id    DEFAULT     n   ALTER TABLE ONLY public."UserTest" ALTER COLUMN id SET DEFAULT nextval('public."UserTest_id_seq"'::regclass);
 <   ALTER TABLE public."UserTest" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            p          0    80549    AnswerSheet 
   TABLE DATA           m   COPY public."AnswerSheet" (id, "userTestId", "questionId", "answerId", "updatedAt", "createdAt") FROM stdin;
    public          postgres    false    226   )�       h          0    78563    ExamineeList 
   TABLE DATA           J   COPY public."ExamineeList" (id, title, description, "userId") FROM stdin;
    public          postgres    false    218   F�       `          0    60472    Option 
   TABLE DATA           G   COPY public."Option" (id, text, "questionId", "isCorrect") FROM stdin;
    public          postgres    false    210   ��       ^          0    60461    Question 
   TABLE DATA           d   COPY public."Question" (id, text, "userId", level, randomize, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    208   	�       d          0    77293    QuestionPaper 
   TABLE DATA           b   COPY public."QuestionPaper" (id, "userId", title, "updatedAt", "createdAt", duration) FROM stdin;
    public          postgres    false    214   �      f          0    77307    QuestionPaperTopic 
   TABLE DATA           d   COPY public."QuestionPaperTopic" (id, "paperId", "topicId", level, "numberOfQuestions") FROM stdin;
    public          postgres    false    216   m      b          0    69016    QuestionTopic 
   TABLE DATA           F   COPY public."QuestionTopic" (id, "topicId", "questionId") FROM stdin;
    public          postgres    false    212   �      Z          0    60439    Subject 
   TABLE DATA           ;   COPY public."Subject" (id, title, description) FROM stdin;
    public          postgres    false    204   �      l          0    79410    Test 
   TABLE DATA           |   COPY public."Test" (id, title, "startTime", "endTime", "userId", "paperId", "listId", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   7      \          0    60450    Topic 
   TABLE DATA           F   COPY public."Topic" (id, title, description, "subjectId") FROM stdin;
    public          postgres    false    206   �      X          0    43993    User 
   TABLE DATA           r   COPY public."User" (id, email, password, "firstName", "lastName", otp, "otpExpiry", role, "isActive") FROM stdin;
    public          postgres    false    202   �      j          0    78574    UserExamineeList 
   TABLE DATA           D   COPY public."UserExamineeList" (id, "listId", "userId") FROM stdin;
    public          postgres    false    220   �&      n          0    80541    UserTest 
   TABLE DATA           T   COPY public."UserTest" (id, "testId", "userId", "endTime", "startTime") FROM stdin;
    public          postgres    false    224   �&      V          0    43981    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    200   �&      �           0    0    AnswerSheet_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."AnswerSheet_id_seq"', 1, false);
          public          postgres    false    225            �           0    0    ExamineeList_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."ExamineeList_id_seq"', 2, true);
          public          postgres    false    217            �           0    0    Option_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Option_id_seq"', 1300, true);
          public          postgres    false    209            �           0    0    QuestionPaperTopic_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."QuestionPaperTopic_id_seq"', 10, true);
          public          postgres    false    215            �           0    0    QuestionPaper_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."QuestionPaper_id_seq"', 5, true);
          public          postgres    false    213            �           0    0    QuestionTopic_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."QuestionTopic_id_seq"', 320, true);
          public          postgres    false    211            �           0    0    Question_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Question_id_seq"', 321, true);
          public          postgres    false    207            �           0    0    Subject_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Subject_id_seq"', 5, true);
          public          postgres    false    203            �           0    0    Test_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Test_id_seq"', 1, true);
          public          postgres    false    221            �           0    0    Topic_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Topic_id_seq"', 16, true);
          public          postgres    false    205            �           0    0    UserExamineeList_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."UserExamineeList_id_seq"', 1, true);
          public          postgres    false    219            �           0    0    UserTest_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."UserTest_id_seq"', 1, false);
          public          postgres    false    223            �           0    0    User_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_id_seq"', 62, true);
          public          postgres    false    201            �           2606    80556    AnswerSheet AnswerSheet_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."AnswerSheet"
    ADD CONSTRAINT "AnswerSheet_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."AnswerSheet" DROP CONSTRAINT "AnswerSheet_pkey";
       public            postgres    false    226            �           2606    78571    ExamineeList ExamineeList_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."ExamineeList"
    ADD CONSTRAINT "ExamineeList_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."ExamineeList" DROP CONSTRAINT "ExamineeList_pkey";
       public            postgres    false    218            �           2606    60480    Option Option_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Option"
    ADD CONSTRAINT "Option_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Option" DROP CONSTRAINT "Option_pkey";
       public            postgres    false    210            �           2606    77312 *   QuestionPaperTopic QuestionPaperTopic_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."QuestionPaperTopic"
    ADD CONSTRAINT "QuestionPaperTopic_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."QuestionPaperTopic" DROP CONSTRAINT "QuestionPaperTopic_pkey";
       public            postgres    false    216            �           2606    77304     QuestionPaper QuestionPaper_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."QuestionPaper"
    ADD CONSTRAINT "QuestionPaper_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."QuestionPaper" DROP CONSTRAINT "QuestionPaper_pkey";
       public            postgres    false    214            �           2606    69021     QuestionTopic QuestionTopic_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."QuestionTopic"
    ADD CONSTRAINT "QuestionTopic_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."QuestionTopic" DROP CONSTRAINT "QuestionTopic_pkey";
       public            postgres    false    212            �           2606    60469    Question Question_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Question" DROP CONSTRAINT "Question_pkey";
       public            postgres    false    208            �           2606    60447    Subject Subject_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Subject"
    ADD CONSTRAINT "Subject_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Subject" DROP CONSTRAINT "Subject_pkey";
       public            postgres    false    204            �           2606    79418    Test Test_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Test" DROP CONSTRAINT "Test_pkey";
       public            postgres    false    222            �           2606    60458    Topic Topic_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Topic"
    ADD CONSTRAINT "Topic_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Topic" DROP CONSTRAINT "Topic_pkey";
       public            postgres    false    206            �           2606    78579 &   UserExamineeList UserExamineeList_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."UserExamineeList"
    ADD CONSTRAINT "UserExamineeList_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."UserExamineeList" DROP CONSTRAINT "UserExamineeList_pkey";
       public            postgres    false    220            �           2606    80546    UserTest UserTest_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."UserTest"
    ADD CONSTRAINT "UserTest_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."UserTest" DROP CONSTRAINT "UserTest_pkey";
       public            postgres    false    224            �           2606    44001    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    202            �           2606    43990 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    200            �           1259    81847    AnswerSheet_id_userTestId_key    INDEX     l   CREATE UNIQUE INDEX "AnswerSheet_id_userTestId_key" ON public."AnswerSheet" USING btree (id, "userTestId");
 3   DROP INDEX public."AnswerSheet_id_userTestId_key";
       public            postgres    false    226    226            �           1259    78592    ExamineeList_id_userId_key    INDEX     f   CREATE UNIQUE INDEX "ExamineeList_id_userId_key" ON public."ExamineeList" USING btree (id, "userId");
 0   DROP INDEX public."ExamineeList_id_userId_key";
       public            postgres    false    218    218            �           1259    78580    ExamineeList_title_key    INDEX     [   CREATE UNIQUE INDEX "ExamineeList_title_key" ON public."ExamineeList" USING btree (title);
 ,   DROP INDEX public."ExamineeList_title_key";
       public            postgres    false    218            �           1259    77923    QuestionPaper_id_userId_key    INDEX     h   CREATE UNIQUE INDEX "QuestionPaper_id_userId_key" ON public."QuestionPaper" USING btree (id, "userId");
 1   DROP INDEX public."QuestionPaper_id_userId_key";
       public            postgres    false    214    214            �           1259    77276 $   QuestionTopic_topicId_questionId_key    INDEX     |   CREATE UNIQUE INDEX "QuestionTopic_topicId_questionId_key" ON public."QuestionTopic" USING btree ("topicId", "questionId");
 :   DROP INDEX public."QuestionTopic_topicId_questionId_key";
       public            postgres    false    212    212            �           1259    77922    Question_id_userId_key    INDEX     ^   CREATE UNIQUE INDEX "Question_id_userId_key" ON public."Question" USING btree (id, "userId");
 ,   DROP INDEX public."Question_id_userId_key";
       public            postgres    false    208    208            �           1259    60481    Subject_title_key    INDEX     Q   CREATE UNIQUE INDEX "Subject_title_key" ON public."Subject" USING btree (title);
 '   DROP INDEX public."Subject_title_key";
       public            postgres    false    204            �           1259    79466    Test_userId_id_key    INDEX     V   CREATE UNIQUE INDEX "Test_userId_id_key" ON public."Test" USING btree ("userId", id);
 (   DROP INDEX public."Test_userId_id_key";
       public            postgres    false    222    222            �           1259    60482    Topic_title_key    INDEX     M   CREATE UNIQUE INDEX "Topic_title_key" ON public."Topic" USING btree (title);
 %   DROP INDEX public."Topic_title_key";
       public            postgres    false    206            �           1259    78581 "   UserExamineeList_listId_userId_key    INDEX     x   CREATE UNIQUE INDEX "UserExamineeList_listId_userId_key" ON public."UserExamineeList" USING btree ("listId", "userId");
 8   DROP INDEX public."UserExamineeList_listId_userId_key";
       public            postgres    false    220    220            �           1259    80557    UserTest_id_userId_key    INDEX     ^   CREATE UNIQUE INDEX "UserTest_id_userId_key" ON public."UserTest" USING btree (id, "userId");
 ,   DROP INDEX public."UserTest_id_userId_key";
       public            postgres    false    224    224            �           1259    44002    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            postgres    false    202            �           2606    80583 %   AnswerSheet AnswerSheet_answerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AnswerSheet"
    ADD CONSTRAINT "AnswerSheet_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES public."Option"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 S   ALTER TABLE ONLY public."AnswerSheet" DROP CONSTRAINT "AnswerSheet_answerId_fkey";
       public          postgres    false    226    210    2984            �           2606    80573 '   AnswerSheet AnswerSheet_questionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AnswerSheet"
    ADD CONSTRAINT "AnswerSheet_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public."AnswerSheet" DROP CONSTRAINT "AnswerSheet_questionId_fkey";
       public          postgres    false    2982    208    226            �           2606    80568 '   AnswerSheet AnswerSheet_userTestId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AnswerSheet"
    ADD CONSTRAINT "AnswerSheet_userTestId_fkey" FOREIGN KEY ("userTestId") REFERENCES public."UserTest"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public."AnswerSheet" DROP CONSTRAINT "AnswerSheet_userTestId_fkey";
       public          postgres    false    3005    224    226            �           2606    78593 %   ExamineeList ExamineeList_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ExamineeList"
    ADD CONSTRAINT "ExamineeList_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public."ExamineeList" DROP CONSTRAINT "ExamineeList_userId_fkey";
       public          postgres    false    218    2973    202            �           2606    60493    Option Option_questionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Option"
    ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Option" DROP CONSTRAINT "Option_questionId_fkey";
       public          postgres    false    2982    208    210            �           2606    77318 2   QuestionPaperTopic QuestionPaperTopic_paperId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuestionPaperTopic"
    ADD CONSTRAINT "QuestionPaperTopic_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES public."QuestionPaper"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 `   ALTER TABLE ONLY public."QuestionPaperTopic" DROP CONSTRAINT "QuestionPaperTopic_paperId_fkey";
       public          postgres    false    2990    216    214            �           2606    77323 2   QuestionPaperTopic QuestionPaperTopic_topicId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuestionPaperTopic"
    ADD CONSTRAINT "QuestionPaperTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 `   ALTER TABLE ONLY public."QuestionPaperTopic" DROP CONSTRAINT "QuestionPaperTopic_topicId_fkey";
       public          postgres    false    206    2978    216            �           2606    77313 '   QuestionPaper QuestionPaper_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuestionPaper"
    ADD CONSTRAINT "QuestionPaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public."QuestionPaper" DROP CONSTRAINT "QuestionPaper_userId_fkey";
       public          postgres    false    202    2973    214            �           2606    69027 +   QuestionTopic QuestionTopic_questionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuestionTopic"
    ADD CONSTRAINT "QuestionTopic_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Y   ALTER TABLE ONLY public."QuestionTopic" DROP CONSTRAINT "QuestionTopic_questionId_fkey";
       public          postgres    false    2982    208    212            �           2606    69022 (   QuestionTopic QuestionTopic_topicId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."QuestionTopic"
    ADD CONSTRAINT "QuestionTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES public."Topic"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public."QuestionTopic" DROP CONSTRAINT "QuestionTopic_topicId_fkey";
       public          postgres    false    2978    206    212            �           2606    69009    Question Question_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Question" DROP CONSTRAINT "Question_userId_fkey";
       public          postgres    false    208    2973    202            �           2606    79439    Test Test_listId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_listId_fkey" FOREIGN KEY ("listId") REFERENCES public."ExamineeList"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public."Test" DROP CONSTRAINT "Test_listId_fkey";
       public          postgres    false    222    218    2995            �           2606    79434    Test Test_paperId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES public."QuestionPaper"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 D   ALTER TABLE ONLY public."Test" DROP CONSTRAINT "Test_paperId_fkey";
       public          postgres    false    214    222    2990            �           2606    79429    Test Test_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Test"
    ADD CONSTRAINT "Test_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public."Test" DROP CONSTRAINT "Test_userId_fkey";
       public          postgres    false    2973    222    202            �           2606    60483    Topic Topic_subjectId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Topic"
    ADD CONSTRAINT "Topic_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES public."Subject"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public."Topic" DROP CONSTRAINT "Topic_subjectId_fkey";
       public          postgres    false    204    2975    206            �           2606    78582 -   UserExamineeList UserExamineeList_listId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserExamineeList"
    ADD CONSTRAINT "UserExamineeList_listId_fkey" FOREIGN KEY ("listId") REFERENCES public."ExamineeList"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 [   ALTER TABLE ONLY public."UserExamineeList" DROP CONSTRAINT "UserExamineeList_listId_fkey";
       public          postgres    false    220    2995    218            �           2606    78587 -   UserExamineeList UserExamineeList_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserExamineeList"
    ADD CONSTRAINT "UserExamineeList_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 [   ALTER TABLE ONLY public."UserExamineeList" DROP CONSTRAINT "UserExamineeList_userId_fkey";
       public          postgres    false    202    220    2973            �           2606    80558    UserTest UserTest_testId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserTest"
    ADD CONSTRAINT "UserTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES public."Test"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."UserTest" DROP CONSTRAINT "UserTest_testId_fkey";
       public          postgres    false    222    3001    224            �           2606    80563    UserTest UserTest_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserTest"
    ADD CONSTRAINT "UserTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."UserTest" DROP CONSTRAINT "UserTest_userId_fkey";
       public          postgres    false    2973    224    202            p      x������ � �      h   .   x�3��--N�L��uvT.)MI�+�43�2��M��LA����� �E      `      x��}kn�H��o�)8L#�K���iTJ�T�n�ZRVU/[�"�;#�h�!�z���a���dO�?�s������d0���A�R���������=ߏ���j�>l�yW�U�rŦ�E5y���yx��~�\�MW�Rv�L��&�ڲ+����M�u��~p�j�kD�8?�Ӌ�sQ.�����Թخ�r���m54sΪ�hܻǦ�
�Μs���7���ݛ��=��%Ȝ�Ū@��:_�E�r��f$�-�)<jxΧ�"�]�ԓ�X��|^ן�\���C�P���wn�|�Y'�Z���U��+�êV��M�l�������H�C�Qm�{�8?��a�5�y�m�p�7t��S+M�٧�xo�#<�����*��,v��Թ��­��Z��~*���N���O���k�����SѺ��Z�Ͷ�J�ۮ�g�C��\ٖ$杋B�����C\,�ӑ����۶�:����[��ԕ��P97EõhEU33ռܮ��+C~���r�W4
܇r�f��\�yq��u���ѸTmq���d�sU�^�Ƃ��X��Ǽu���"���:��
#$!)4T�gH��]Ѭˊ���0'_��֤C��U2r�6�����o`���$Ο��*V��lRG�i�	2�S��5���K�k�=b��'xTb�~x��W�]�~����޴�oI%E�t�-���s��?��{RUOyS����<�	����NKFc����Wy�n��rI��eI�H�X�a��j	j���15�؃�>yY<�D���gNuo���ʁ8����v�/%i?�;��S��k������S�Z����5�ѰB�+4TR9??R��Hݬ�?�-dv5F��?@A�����OI��@��m��׼[�n%�����������%Q1�]I�eP���O�,��r�Μ��z.�ǲ��Qb�F��}�=�`�s= �y�{������z'�����M�2ź���5����9���̈ȹ)H�ӗ�!�ch�}Dn��r��
�Q��DZtI�L�I���igN���#��강I���s]n
���@$ TK�c��f%����4k\���.�������E;�н�a�☦s��C�ĉ�!�R��՗�C;i��|�(�[4-m�3�fIf����Mb��$�?�'��t���I:���fCݜ!$=rD�h��1�ҙf�;�\����F#偦���]a��� s��}E�p��a�'�ȨdoۡCe�t��eپv֛�&3�G㡭�͜g�a���=�g���2�P��&rNr��--��@+Ҵ�L����:'���h��	�%���x��ӳ2[b�C�7<��k^X���g�P@
�rõW�)|���̣����T$�+�� |'�M��#��Qj�V�@-w���l�Ic�(��i"��ټ���D�j�܅�_�6ҷ���V�h��V	�B}H�e]!3U�?��W3��>1@��w���JN6��S���2�_6)�ʿ�o6��\�Fz���[�0��!�����s��:�L�[�@����%�B�s��o���K����ۤ��{��܃*v�R�0#7ż�^�V�ٲ���_�4����7�f�Rjq�*d=�oW�Œ�{Z��˳_�1�_
�E�����z�LU�p�r����wp�ԍ�\�DVqO���#!��$l�P���N�x��x1B#�ք͓�%��[��7�1��D��a�r)�k�G)sj��š��ߩ��X�@�7]	K�7��U�����Bx���5 	�M�%� S \X�pJld�"06S�H�@���6��!����}2��XS��q�<�k �i�-�����Ԙ�!Km.+d^�8t��o;WQ�����C1(��Q �%�}o�%���#/J^�~.^�N��ѥL7D˸������
�#c����(�d�}WM|^��s���#-;0d�Q��������3]`���Q�g�бY���,Og���,M�M�Y�(�xg3KKɌ��݉m}j�Cj67ﺦ���&r-���V4֢�Mɢ���<�^ve���G�x^�eB�?�@��>�[���1�?��M��Bmc=��ʊ[5!8a��K�ij[q�G�����:e�Az��A��U��*i�����:����	�R�zK���-)��{F:���g�Lґ�����WR+����Kh_V�M��f��dF���VS����)3EjԷ'�75��}���)�շ�F{��'�8�'���%�h[O�tw��ܙ��ɾ[��Cӫ=:-V��O�iDEg�1�ָ�0��Ǻ}��k9�N8�$��G�澨tZ�Ym;��2Ez�g�?6{�(hIq����?\T5-�z�����yH�1�%�Q�h��c��e�P|����X5�q����^����[U
9�e3߮�S���uS�Mg�I�2m���~�Aؖ��UQo[�d���;�{Z :߉w���9)Y��B�R��]��(V���X�mI��y؀uŜ�IϪ�r~dX���݈�G��()�EC�ؔ���lMv`���u��;���3
L��-���F.Sk�ф��;�`�r|���hK�����7�Ҭ�0Q�����Qu�R��An��B�d�WK���cݨ	R�Q�d�Q��m[ly�4hT��Q���_�P�7�%�W\T*�����&pnuA��FZ6x�VK�o�(��޴Q�Ĺ�Hi6�� ����,���v[`?Jɰ����@hU�HͲ�=�>��(U���%�i5+(u��*y-�i������)O�dD�F��'���̛i����i֫PC��Ƞ�{�9E82�yU��O�*��奚?6T����>��o}Z#=dMA6�+LK9 r�\�׳BKL�#�~cA͜
���I�o��<�E6�mXa�'�m�bP���$&ou��r�3h,�
kh90��!k	2^�l�8���%�X�35jpҲZ���l?�����@ ༵hX���O��+`�D���$]�����r�މX=�	r|uaR����֤h��S�$���/��O��)6�@�:=�)p�����A��3˱f�kS��B�#b��I��fQ��sϩ��G�mY�9v�#V<d\?�����f6}%uҨ2�����BH�=&�,QB��'\"kW�s賴���~B�g�C#F���Tj1ڋa4Df���L�j�'��Nuw���s~��G�_Q�����nK}��j̟�Ŋ���T��5,!�[�_�
ދj���9����:�8�Z�[��9bp䊾ola@�2%��e۴��9�X��
k,�tE��ׇ�G�b�|�;s.�eU�L�٠%}Zvx���E�'O.�zm��R��65�z�B�Hm���m';vJ�Q�]�2�*JX\�-�`C�]�uq�@��3*ݷ���U��+�� �&_�(�K��h`z?49kM�r�鈼�^%�!D��RҶS]���#�;�q;��Ĝ�fɐN4`G����L�R�Rv�8��~qS��� 8*��=������g��D���ɲ²V�n�g2K��GK���&�f0>��3L�N~�RC
c�⥱0D��Q�.J����7�lK���C��H�\ni�>@��g�����y��Ndu��bLp$��c28]x���v���K��hY���'b�K�i�@���Q��NV���xqdR���To���Z�1klZT\oy�ɲ�5�Vz}&*�jX�PR�E��JHu.yn;�J�jD�
<��w�n�dh��I*=0b�B��姨w�E2hW�TkM��l��a<�B������%��gXP�=GM���T6l�-��')��LH��W�B	̅6��K���6橅���Z�<�}��F��s��7=��s��c��+�Eʎ.EhVđn�1E����\�Ď�BQ�=>��$�=R_Ǉ@�\�v��5Pʊ���ME�������/t��}��2��S�ya�<����F�X�k'&�a;W_�[��ʻPs(���U���)SQ�����Lz�J�9�[���J��]B�"F*�S��ѿ�,Xe7�	l"���^q's�a�;a�����a���hO��H�f@Q�}G�J��mKkC�K��n�    �B����V\4�l4<������N}a�������:Ϲ.���	>��uק�zIX����7=��3�u
��x*E��'�<��FI�<���T`�$0��E�m�n�$�uCPx�=�E,��T��6aMGJ�HL��k��UK�E��é�"��`�zQ)</Qe�2����h�-޾��j�?�^�$���[�l2j�Z��z��^�4yET��N4	+)8�HΒ1��H��$61G�ZMxR���-P	��GOFu�U������n;��k)�@Z���2JC�`W�����A���Wbi�#��g���Ӏ]���70 {����t{�C��	��2�w��.�)���X��*l�7cE�aH6�.�Y0�Rvq���9Ρ�(������|�z��*��r����2+����vt��5 ��z�T*�� �Jk�� ��d�g+-�& `��� -@`��� ,�����#��R��a�ZX+��pʜ�0G= ��7�.�M\䜣I����_�"�(�#DZ�) &��P��,u�^�fR��*��"���lwQ����f�0"��J�TV���d�p�M���u�?���[�l�0�<���BSÛe��*6�b�h��_�h�"	�h��m5�Ɔ,e8)6+6I%�ƥ���T�QPN��0�i.VN�.�J��Q��Z:մ8�BOtqƊ�,�k���ʘ ܑ�*���b�]b��s8cEv�J�9?��x&�I3)�����ۻ/-�R���J�Ώ/�M�` �G�0QS]65�d;d<tci�]x��v�)�������qK���s��������6b��se<�Ȓ�*J*�U�$����$X����F�#ùS��z$�5��K�����ܚ�ܿ�<4�\=�aq ��0������
 +xOg<�H�5s��T/�H=��Jy�HJ��{�75��L�x؂,UM�ә�%����=H�Cd���Cl����̈��j*����M$�o*�4�q?�I�'�l�>��u�Շ2�Fi]i(�/T
�D5��v���&<���T��c��K:65�{���o�}n���>4쒦9�>�"�Xb��e��w�B�En��&�b��=Y���*1�&�љ�J�����۶�D�S�\���3���3�T*�!.p�6r��P�+��4_��[Ø՘Oy��w����1_=.�6��HB㡤O�X �'�%�׬��v����;Gk�Ul�΄VglU�_&��s���|4�*x�EҜ��Q���Na��BF��hp<����!O���f�ة2���B�1�f2��Ɲ��3�Y��բд$�f�#l�nM������|i�!��8ϱ�:�@��5��z+�O�2�i�ZI?c�J���5�+�U��^�!�ѧ�D�Z5��d����b�׷G�{y��1s���CvXO�i��_��B���,(�'V/��_4]��Zn�E����ܰ��M@|��	����\���n�1��^Λ�92=����h(yr����bUlQ�����,2�0I��r�,��n���B������d6���c���s!��9���Bw^�-v#x�'�x���K���o;*�XWx���p�7T4�6��1��$�Ӆ��#��� c�FB(�;��n˴x���cǺP���^u!���'�t6z
N�Z�)`+�,�2����Ć�+X��W�B��Td���AEؚѤў|ؑ-��w2�M�|,��ua
���\�ć͢��MV�;p� {臦�n���Ӄ0�m�����s[�0��|�+̔+\��cl�K:�.�f�9x�����O��f3���#���؇P�j��xl����nBI�o�9��Ƙ}�M%�h'���\$�a� �HFૌ4�@�3����s���η�#�z������ b�5f��LHE�����BmR�}���G�N�m�0�ߦ�<�w=�¹wP$Xe�+f;;.
���Tݽ-�@�,���.���"ͬ�E ����Gk|�kuwA�[�G�2�;5~E��/��e�jnޞm�p1�w46-�z����i�?���.;f���A��oB�t������s��~�uC�7n���	|�V`�z;M�L�{�S��[�|KW.��1�Y5�u`;��UGS�]$	}����x�����Ⱦ���!�@__�ł�VM�X�ey�!�ك�4��Pv���!yS[����Z��ۆ3���	��f�#���5�X���
A����%��|�Z�~�=��L����� �m���3J0{v9,B�Q�%	��JM%|�,�`�#<��į#��./O� �IV���� BJ���z �n{s}d@�8gw�`��,�����>M��$A;g�W�7oZ=��w��_6��(��/�A�����V����D�b��^�2f�����~�
������Nx \Wo'��2Zwܜ��|w1����$��J|�S�nGI�R�����1��-8`�tZ+�ޏb�UvX?��yD��K۵@�����S��z M��M�k�{����?��I�J�{�Gd�Z;.-�k���S;"����������`���Tv	h@<�-:��>t��/�T����*����G�Q~�`�o
���w��^Ƅ-�������YO���&
	���l���dB���*���s{ya����Yi����M�6=v	����7�<xNS�a� �M,��B�8Q�k �ôOeN�K�{���4.&��N�N*	�|^�B��S�;��Vŭ��T�P�^�ꤘo�V���`>d[K�);���9?_�����������瓻㫫�\]�|�'qd�^�(&g<��Y0����{I��xF19㙼'
ԡAة:&���S�$r�O�N��Ĺ�=B�c���xr+I`3����Ȥ��9�����߻o7����" �g��~<�
s�,~�c0��B����J�8�;,�d�y�0��3 �;u�p�� �ܗ%D�IL��I5�"�
0f��~窙FN�u�8:�NB^Dɨ�Ɣ�$< e�C�b�W8�(E��Bd+A���ZEF������)|���\N���,p���X(��j	�^W:H��F-��'�G�.��l����TA#��Ѩ��~��Bf!d$jpڿ<�^�=�DFr��͛��?v����~�q�Ω1}�?}<�$��.9��Ckx�X�Uռn��M<EJ_����n�.��^�1�����{�zh��=��H�}K�,'��Zյ�,��a�zZ!s�$���5Z,X9�J�nZ/����~�YK8	���g�c��,�Hb= [�- h^uʕ�!f��)D�\����>�1WWo+��|p������"y%��F&+2��LIG���߮� ��!6)?7tc�/t=�Y��湁��o��@d�	eD�*��n�e�����ڋ�81~���j?� �߳54��L2r��-�+�P�$�],ƞ_�=�Q��Q�auC&��:�����Z�T�(�?iP$��,���m�u��B���ӲZ!�����'=M��ǿ�O�(���Dr�UW��)m�9�(&��pf�P���6P7����3�˄>
���T�k
�po�=v���@$C[�%x��Ki�+L��juz2�OT\�>�9g�i٤f�Є�HS�����= ���F���#9�ƖO�vx�:�m|)�~�Ml�A��}4a�R�Aj4	��&��$�>�x�$�o��#� g��Nl�66b,-����>�u|������4�uy�x+�%Φk`�]^}<���5{俅�n���w�~꘥���L�� 3���߾���Z��_+��=M�0���t����ć��و�ß�A���#���� E����5�!�R�k�~`��D�"u��xWw	�K����� ��zJ�{f��F����U$��|�a ܿ�����oK�I�R���C��d���l)�;����T��-��J�@�	$ր�
:Q����k���l_�+fBF��5�>��N�ŀ���L�9���Ba��K��k+�9�C���4�    )l��¾-����1����!Gx�ӈhP�$'r��xM�c�ߕWr�!��wL`�j`�7"��*X[X���mi'm/4�?��L��ij����`Ga�G�����ԥ�>(�^8��T7��jQ�l>���ĳ�5{�&�9�[���d��$Ƶ\��{0D�	����"�7�
Uw��E;������A.N�ra=���[��lϔE�	�*�@Jh7�i=ރWkK�[/e��?�8G�u���8{:�����2Ipq�ϥ�"q?��E�K�t�e���U}��]�doX����DX����_ � շ� B�9�bc�τ���'g��5����L��
IV>�����ә�f�N�$j|�E�.�S��9���+�W;E�IyY�P����l�rA��Y��D@�ҽzt/k}g�c�τ���2a����f2d�F&�2��%ȪǾ�	Y�k�]�a�?ɻ7)�|4+wK�\���"�ATp��fҔ�]��!�ī�� $t���6I$��Ӥ�IR�-���7�Ȁ�E@����=N��a�7�5dƣ,K��4P�ֳ���q��մ`YÑBnt",{f�^��+�i�����3��;��Q5U�	-=.W��K'��jI�{\��	���ζ)���$�k���0d��}��M��G���vM^"�0;��d�
��bç<>{���$?E���M4��؟$�=A��������{��w\E~��R7'�"*�:�����n��+��f�lf|�j*
 "��O:���4���)y�a�|<�������g�{ܿ�8���۟��ܓwry�����/�=��n��$��JHi�}��|�eGʏ**�O2�I|%�ߞ0@xc���b	o���춾zy�׍#xs$|f*�s��rŌ"�_/��j*<���)�^��%A&} 	�"hp���JA�`�j�����ҠdeG��^J�V=q� _�5'�ѯ�,���"����(}�� ;� �7"|v�Mipfm,hh������jP��P���YK�n�J�"�I
�)�i\�d<��E.�`�I�x�Z����	(ZY�_FmL������7��	��,�0��Y�nH�����'ؽ7�| E��ٰx��Tt�i&��MɊ�1v�MɊ�z�?�.Y��X���[8"�|d��Y1V�ա�۵�
/f�X}W}g#��(���*Q;D%��kfv�Mqį�����XbE,|`w��Vu�i���Q"�T���==���͚��3��AHr?P��g��N���d➗9Q���y��!ǽ[	� q�����<��Fr�w��<!�@߹��.ݻ%�	<�;���q8%{��� @ <�z ��Da"��T`�i��B ��>fH�Bo��U����4d��y�<�3�t�r����8o$�`G�m�L���>{��tF8.�	����SX�oO|`�c0hd�8��hb�Nɐ������5�ȟ޽�f�M�k��g͒�)���LK�,90_��m1�̉�~3`�7#��bv��}����-�Ջ��iM�"6��I+�����w�ȉ8��vս�z9���w�r���UN�F��L8e��t6�6+�!6�}��
�J���H�8��~l�N�#O���G�ڱ��k�*:�����{q�^�W�
N��s���N���r������96�؝8#��K����R��*�8�p�� 䗬h��pK���J��ճX����xk���7����A}�����솛as��Ñ��(}��O�=ґl��/��������t���o��^Kv.��j5
������|>/9-P��e�tR|?�� ���������N DA�����M�ޯ�A���~������_~�=��'��n��L���+�!EY"�ϚH(P̸���[�X2v��-�OBp�ͭ��w��2����@���Λ������^쿙�)-4ȧg�o��.W���j�ݓ] XS����<���:���G=k�06�W�>+VPd�k�B@-qvzE5)���'���jKZy�2c��<�_!��@�(�g�Ta�- �E��A_Vd��B�N��q��n����ڳ~@�'}6�d���A�+��Q�NC���-Y}.�y���>��s�.#�np)s��$���Ԅ�C�bx��P��F$�g��7�$�3K����1�&OF�+x�+䵉Z&L(ƾKZh�~ �д,k#ܸ��y$���%��$0i���_d��k����?���g��,	���-XdG�kܣ{��]L$V�a'����j��skɉ?l��s}�D�^��E\�/���sa�R���fD�Y�.�Ȟ��Q�~,xM<A�L�DgҜ:R*�4���u�##��$���+��Ic���	
$�	h�(p��O
�#0��:��{��$Ij�Y�쉸�}2p~���@ެ ��	�r�s�r�����4��}��,6�ؕ�)vy���Q�7�x�X?z�����`���3��s4e�d?�K�M����5Ԗ!���?�m%�2ygA���X{F��O�-)��"[~�WML���sN~9���(�r4�0�襗Ww�M�y�̼{�o��0�X����V���������B5�'ʺ��%*���?X�����'T6��pbz�`	��o[-r�)�j��ÅM�n��_ۏ��Yye�d��x�S�X\�x�ah�F@�������zFF��g%#����� 8���/:1@O�X���k��3ϒ��:9m{2�S�WBU�|=R%���r;:w�t$�6|	$=�K��fiC�[7�F���9/��zHXQʋ�K�H���a�Iv��f��^ ���N�>{Q�o�<�T�w�H
�Uەʸ����s��&@�Y~- ��D�X�X�<Y�Ĉ��M����R�L�9��u�F�ղ��8�Ӌ'q�_�)���h�;Z�G�u��
���ᰄ~�>������I���	D��d���.(�~`Hʈ�	]LEh��+s"!�@�E�:?"��q�*(W3s.T�d�m��K�B��� I��+�4�܍u�C_cQ͖(׏d��>~�,D���n�V��8?Z�����je��;��\�-[y4hTJZo�Q�:�i�Xt{�+>�Ԡx8�58q�pQ �fk�ǵ@Y�Mb��n�!D�'oC��(�ؗ�!L:��C����8T/D�H;
�p�cQ�U����!R-�>BY���N+Ƹћ����upqI�O�� E�W��+�B$��B�(l"EV{���s,�7�ne~,
��\�m��ISJtQ�ˉB"cXD�w��r�g��h�C��|rx���訄7Һz}H��̙s^<t��&�����'/�[@t�O`���}�!��J���>s�^�F��EN� �K��M�Y�8S-�P���c��p�Nj��jŗ�������l6xh�B�[�z��@�	/)JdNv�5nZ�Z���dW_�]|?Q/ʲ�.~�~�/��4f�k�!� �G��|DM�Q*��ODQ �ا<9�����O'���X7���B���^�(ԣv�طT�wf�!8�����"�K�3B�Z�z����
�4��%84���@k����P����W��Dޑ%�XG֏���U=Q2Qn��!蓚�����7�)7��tU�p&�T������Fm�s|c	�ru���
"A%T��V�:��1�x���={p�b��?�[ʔ�<��i�S>��x��bVΛ��*v���_,���j���AQ�ʰ�*�en9�z[.+�{Y��m��Ѥ]���{�^q�"i6�V���H�b����X4��{rxC��\�5�|��g{��匤F�D9}ެ<0���{�󃔕D3�̓�J�\^/Tg��Q�ւMg9W��m��Vl�O4Se��⎧�U��ȓ�V�1)��E^��]5@����������!����+-���K�hՔ�>��������"��4�S�W�����l"X�Y��R�L`Q_�%~��Q?)�Iv���5�F���̝f�I�Ԟ�&)2cK�羇8�4ՠ~?Hb f  ��|a�Cx��mH�OSݻ�w����C��3�H;g�v�ј�W�56�m�R�4�R獵�&ۈ���9�=R'DВ��&1����]uv�7)��7)v��S����Z=g	��^ZO]��&�����������|�w-��;ĩL:�X}jK�e�''�#��������l@?��A�of%#G�8��	"�@7Q~T��@ơ7\fjl2Tj��c���Em��!j�k�'��LW��T���È����&��b/5��o�}��Ze���#����������T ޻�t�N�㛫�[�UH�ˣ�O7G�czRg?�x�����& �=�DN>?9<����x;�'[u��;�h
�t~>��MFа���snO�Om�E���1����G/L��(:�"&�PBd��p[wcv�3�t	�"�Tg�CZX�dg�� ������L��ש��X#��P�T�Ks�E�q����5�2Qo餧���D�=�633Q_��j�	�����YL�9ý�O�̾�\Xg�j�wx��m�-q�vn3Q`����|�ͳ�x�9Г�e+�.�(����(��4f��5ʅ�1º�o�B
��ǈSږ����z��wr�����>�C�,�z<��Dw�V�7��L�;B,�#Rsţ��O��C59e2Y��u4�f��i{eOf��~�#�7�@��U�8�F(p8��� �������W�[���ܳ�;��9��ț��Juɮ}=w&͜�Wr�G�iAؾ^y�a��VJ%���R*R���;�L��u�'�R�L^���؝���I��:T0�W��q�2�a�
f򢷿/����=Y�
5߮��QwC����J�7A<x���G��_߿y�����h9      ^      x��}ێ�H�س�����8�_��=Ȫʞ���ufvώ]F����$RKJ��Y0O���~1`������_�s�I�gwػ���#�q�ĉ�A8��7��+�z��뺱WE�-���<l���ն^~��M��;�lg�;{W���nv�������g�镟\y� ��gŏ��s]<�V��jSVO?~�6�׋�Տ����X�|*����ǧj����g��u	����f����%<Z>-���� �
<�>G��|�>��o	��o�/�������K��k�>-�N��X���+��T.�(7y{R$�^���Wn�w�44�� �]���= u7ykH�eѶEk�������h�c`�~���|����UQ����.���wv��}�X��v�kXM-XzyN��&�Ā���˕}��Ea��������sm��	������Wv�XT@#�_���},�^.��3"�>�؉����7�]W�v��4dYW���v���m$:ԇ|k�ͪ �»9�$ikN�ϫ���X6c�#7�R���[$L���M���a?_T�]�䈎��l�ǲ��ZI���UI�r"D���z].��ØD�U�9I��r��VN?�x�pd��m���[A6�+G�,��@
=�0_{W��;���_@�S�~j�+�zWW+{�r�5Rb]V9�L�"�
�H�?*r��A-���9�������9���+�}��^l�[�;�l���U����X���wE�I9b�l��#���Ib [��m>��k�c�2/��r����
����`�տ�m�3l�]�����a���SA�ܛ�5���+=��j�v[?�¢���c	pqw�%�������/_�m� +�p�o/��)�>���{��/���؞:��E����lS.����B�����Lp+.(a��UC+�B��.�Բ�������o�,���^v�zW��h[����K���.I�o�(%�0⊨t��?v�Ӱk  K� �j/Ng^�5����3�'�r��jz�� ��l/�e}��8�����Y�Cs\�9'dR5��2'LFԖp+R���3�����ya�m��2�����~��=��z��f��U:�y��:LS��nʇ���sd,��y��(wr�����W��$nd�[a����U����2`?Dy��v��[���C����Or>���f.�50�\�6��/� �Lp+��5y��ʶe��>C}'�D�?�H�'h5 H��c,��2�o�]���e��X9��<7�VB�b_�*�.E�7��	jqꘞ	ny.�!��#���q�m�������:_���p"F���Y2���;�B$�q㬐���5�ǰ�G�='J|��<�J���A�O��m ���O��H\T,wEO+8�!b�9!N����t���� �P��w2�q0kx�S|>Cn����@`è�U�Os�YT�	8%w�܈U�$�8'�C�C?�\�-/�4q ��݁vv@]�X Kj�k�_�K��#�*����ˉup�Q�3g�䌢+7q�p4#	�@͓���Bͮ���JZ�&�!��f	����D7�9H�US�$�yY=C�9>C(��N�G�84��C�fӌw��؊��6�C5E��H�Do�Nc��9n��������9 �;�%�P>H5<�b+�햗~	�5p�	�`�5#�KsB�2·	��'��O�-ߝ}d�cÕt9��?<'R��*�/A�-���g���b�ⱱ�����$<y�W�Ho�FS��3i�)Y3�N�Вp��	���Տ9�r����9��ĮB��'^}�N(�s�zuDc�N�
Ve�jN6j��s��/����B�v�!�K�����S
}�����M&�P�(�� S�4ݱ� �񠩻0��+�Yy�Oc�C]����B�-?�}|�R0�Y����?�C�[�-?J�`���*[)da�ޯj\���������7�.0"7Al�[>y]HV�J�}SԉЦ��u$����;�e�8i#'c&�*�A�n�*�`B�.V����(�6��Q�R44C���]��Aۮ�B�\�����ԗ���
@T�v*=�`��E�����9�l�?��]~"k�D}<���؂FR�|�l@C������8�&>9���7�-P]hM`�a����e�ф�.S^��ʇ� QF­ ���ҵ�~�5�8J%�U�%>�� �{O'�8��j�p�^�&%7[Y(`���ʀBǤ� GW��$�p�*��=K��'W�@5ɼ��e=H&�3�I�FK/�rA��C��[aӦ����N}4A��ž	n���sv��� �����g'�z҄�`��LX	���$��b�^�9�;�2�㗏T���G�n�x�q%ܷ"�4�R���Ƣb���@� Z}v�n��_��]��i��n�-�g��./�>܊<<C��ُs4ڊ�*A�J9��> ���~sj��ī�⢩?k#��b��%��9E;&��A�n0?4��ȇ-�N���#�����$�Ib���<nE�F�B?���`@�����'k�	i��h
nE���	־\J�%t��P7�S����q�����:�Q�/�P�o�vC��A�
���܊��mVѪl`�8a��VD�M}ܮ�H�oA����`�z�3��gV�Ps%	��yan���Gb$�'�ʅl٤C�*�%=�Z���IT�z�͛�5đ6r'�ĭ:��-SZ�>Sǋ��S���?���|^����(�c�����9��!���8�|{()��Æ�����n�d#J.���}��/�Y�w��!_ ۠�J��+�Wr�m;���Pa��@y&�eL��y�F��"�~x'�җ���P7�!K��Kq[v��")�	v���N�����4�$;��`!��J���59�6�~B�	�O�ΎX�m�ߟhoLp(Z��ŭ�[1���|�/яGN� ��_�}=�	�������@%���g�9A��ɶ ��"���^����,8`�$���^?à^l?�24��p�n�����gC�7e��E&�@	�nͩu�\�Pq0��
n�53��*��<.~Dy \��_��M�o���;�S/����WQ��#ɮ���H��^�y(
@<̛Q�g���V~L!PR 9BP27�]��82ڨ�ō�Vb{\��*�Ǜqr="���p[I��3��Hi�.`8������GN���=���9�%�������[q28H�nZ$����itqrqIk�P%����������_�Y�T�g�ؓ	W#�I��.�_ �A�`?p@W�L�l��`�����ܒۢz�����΅q��I����o�0��Y���$s�����6��~����H}���g�;b�N�;?�Pt�N��}��x�o�|״���Z���ܖT��6�L�~rY�0-���y�<���^,/�wp�([ �͵�9IE�L��R�d�íğ�1���H� Z[48m��}��. �\v冎'&������	kB��.Z���"h��4O�n��#�c���X��� ?�Lp+	g߃�U㇚b[� �ml�p�ۡ�I[>�Q�W>R#���àS2���[ID�_�-��$h0�؞�m
�����
�������U? i`.-���Q�ɫ��#� 4Gq���X��t�/pa:*i��in t�(n^��Po�0G��@�aI�I��7~;!�+���[I:{�g����{��PH�&�[�������m�/���!:
+ˠ�uuR�_�͸h$��J8�Z�:�[<yv�(!�"1����}���?R�X��L:�JJ�z��b��ֹ�`��G>$�����-�b�ds��<�*�^6\:�R#<�w�!)� �~G����u�C0F;Q6 
n����1(?I�<���^���5�N�jB�*2R��O��]ԡ��ׇ[p��h|�N��<�:F�G6�#
n��x�N��U��GL�{�L]qÍo�~�~�(�-�V���93a��    ��c�sG��p+�g��Z#�!"\9�C vb&h+��?��V���+�Y���I�#�)("��e�v��i\��C9j�������9�1RK	F������k2|w�y8��F�T#��͖�q�;vo�2M����ֿP�G���;�H�Pp+�H�!�%ǽ��*7�渘Hr��|-t �Ҍ�N7RÚ��Czۿr3'#��\v���L渾�*KX�� :Ki��������>3�-��^aU�}X*��:�,(�'�xm`1��L����V
a�[`��V�	�ڨ]����"L��le�*R��K&n5��RR�턋��	��۷��p+gwH���%�9R�
�W�_�rҞ�4da�\$E�%�	nefC�e��t�z����R�؁��&��.��!׼P���� �f��~?���#J���#��5�骔|Cf�s��=���%��/���FQ̂�i�y	g�Ì72��[f������ ~E.�C��7���iL�]'2��>�y�p���ҙ�@��I��ٌ2RG�3�;�5:�ԙږ�HnѮ ��Y���������[Y6���H�B��DjX���`^~��h��+e����!����2�p�s��]�┛�1_�H4l���H@�z�1AL��C���X�i[�.�i��-?  �u�pl�$��/*�
��(Sp���&Q#a�G��nU�w���~�W��0�'_�{`J��a��8X�-L����"�ԋV����R�4;��C�+�2�f�b��dє�N`V% �Z�W6���i�'���C{fy|�w���A	D�b,�CS.(�N�Ro���-���_�~�}N�!L�a�S_�F6�c�����B)8 )��� 2�(>�#���)���CnUp+#����V)r����H��`3�Ai��5ah��1dUc�L����OLp3��"Gi��wr�y���,jL"Ns��Ș+9�_����m�79^���Σ1Mp�A����v�c�$��NL5��V���m�tx�* �o�����m�X����i�.قvEI�Ŗ~�B���@&�Y��QBLE�tg_ny�1��Ue˫#�$�ʇ$��A��^�L�S����S��4!�m���R��9F�D��%�����/j�{�Lr飁����-D�~�e���`�� z�!z�ؒ+�$i&��@Gز(�[����3�1F4E�&#��p�@`��@���-Nf44^<���+�.���8�e'�4C{�"���3���1i%_-p���/7���g��(twH0T���q��q7�f �ݸ�d߇àS�����z�A�z���p��P.[>t�&�	�O�yC�Wp�'�E\ӊ�4&���K��Z�~��v�^�	<'��*��|a)�'����"�jd[?�3$��l���@�g������cD��H�~F�(~nY��T�¸	��h��}����_��T8��W�`���U9��Rp@FdP�{��}���S���.�w�q`�����u{���
V�t�ǹ���߁D���?��Y�S�	<�p�!�)8�g��֥UkXfq��/�g���C8��em�Fd�R�U%��"�F ^6$������Ǽ)��ʎ% k��,��Ep,B$�g��)�D��̼���/������V�r7����3�0np��+9�՚�d!��j8���r{�a���O��qbҨ�8�H��pDK���+:�1*�F���H�J0|9C���\��'T,����e�Ut8��v�������cq��l���
8�Pm��,���\z�I�%�)oV�,��\Z�iq��)F9/�mR=/�r��sg=K�\�)�����{ �� ke�i�5Hd+J)E-'�������f��i�����D#<$�f�;+s�I"�R����^��E����#�ˊ���(�$��ss\�>��iJ�"Զp"��*Uon�A_*&v�PqX9���g7��(���~ ��S1�e�JT�ԍ�]�*p���k(Qڐ��C��V���s����w|.N�&ܥ^	��v�L�2�ߜdt�(8���ںl��%3=M�71E�`#x�	_�d�T+T��>	B��#ä:���4����&�	ny������*�������K��*̵0Hi�Đku��aG	��{���,����"����-k|p��e�U��@��D�&�)�,fc��,c(��błR,�����:'Ɗ�-'�cEaS< +b��,� �uW�U�ә�	�X3n���`@4�=dw6h�O�㏅X��fCr(8�J�f��%ĘA�^{,}z�����acb\�:a��0(2Q�� �R��e�ߠ��l/�[���a�bZ��qr���
��(|���T��-[v�Ȑ�J0�e��
8H�0��W��q�y�S�5?y}s��xg�uR�xꕜ��0�0峑�����������wsB�7�סD,�\b28b�pRjy(E�
�|��sd�0�i�����/Y���?��;��H5l(��u��g�]d�)XY�^G����ͭc�T�������hA:y-��Ցb���\��y��û�������no�ݼ������Ƹ�8��>��"���N+68�A��)�e�]8���Y�(�6tWjp��.�ZS^1�O�+��bI�!�Yz����0�?{�mވ�:�O)YtrZ	���Y	0�h��2������F�%� ����3�,0�4	1���ĝ4�ƥk�6],O��t�K��Cn��1P]ޠB.:��H�� u2�X��n��T�@\�����)[\���;�	�K��BV�-,Uz](�f�(.��\-��: D�֣�wV�y0uԣ/ �ט��Y2��l���P�rP��D��O��ѐ�
O�}$O��|[�P���Y�'Ƴ�w�
� �9YL��}��&DoR4�j���N�Q&p���1N�ہ��ZbM5>�t��σS��L����&�SG�U[|��zӹͥx�?L2��|D�,ʉCR��C�XTL*�,�������0��d::���bW��K��PG7V�*R�:Cx����S��M�S�h(���f�|�g�����4/������dv�h�k�W4/D��� �)A�NF\#ဧ���~6�jbY���E�7��۲B^y�&?e-����d�H��؟*��oxlB����/?U���*�������߽}�� C���SE��/��8� ����������������}y�a�p�(��{Qx@����le�C��$���i��V�����hLn��	�����W�9�P�n���y�����h�򚡛fJ�b��_Hԇ[~4b�-x@�d�b��$��q�����>H�j?���M��$_��a�d�,��	|��1�}�u]21���u���2(IM����5кF����������(:�qbjޡ����z��n{/��_|��:|�u����Se��ߠ�}�Cy�3[���nC�y��ïۗ����L�{�??C�� �PPp�r��[R4�j���/�e���U�@��R���~D��H}�kE<�D�AR|e��/Pr��=䨎ۭ�1��›��%��.���d �J���[ b@���@ˋK~P���뙝wo�������n��%��=��Rp d:{��+UT�p,��]Q8�g9$=)��S�}f&8��E�U��A�Ű����)[tO�Jd,c��T}ez"�
���zG���T-�Σ��n��-/�縴���{5�J���H(�<u�$3�a<j��i�TחvU[(W 	�c��W��'V�<
�ʲ�|�GA5f,�������p�;��@2T�Ee4���I�c)�1���T��KҬ�w�&KC�f�C�s`���p�]rɧ
v�%�*IC�S���Cw.������љ���S�~J<��R���y���[��EE�����	naW�7Uo�P� �$�j���I=j��n�CU��) ����װ�{}QŪz�9�����<0�j�a�FO�    m��B�JD.}�0�p�)��~�k'��ȅ"sl���mP�0�}N�H�F�t
mϥ�o���nG�֤1q��mȇ&��؊���y(S�����mO��i�ǯ���)��/{?ٿ�~�|��sв���x���a�jh�4nL�GaO�
�4�u��d#2�[����zNw�\�_�HI���
����,x�����R���mb��Нm��ؙ>�03n)W.v��[�t�6L>�0�q@O�[^JiF��ڟ�\	˼��n�G���,�<J�JGT`@��e�ϰ^S�0I'Z�6�x��j$�d$��K8��~W?���DzR+}p�@%�Z�4V�
�A�G�o��$5K��ފ�f����f5�W�`��0[M�[�R�����p�X��n��n*�m ���QƦ���cA��X��p8������R�^�Cd���[n��oMm)�v�7�3
naQ��MJ-�I�O���~��
݇��R�f�|�=���� �G�]�7�tm��赊&G����������!-�3�|*�ë^O���!Q�N!1��!]��%C]^�	ٺ~9��`�r�����)B�vO�ֹe��T� ��(kU�I2��"����d3�HIM���U�}������1®�l�4*��e��N?�zga�tAn>�~e~�e��|�Na$ထ1_���e�<>gW��T�����?�־&;�i�M�����Y�K>"SVSJ'`'�hT	�0�R}{0�Nr��������4�Z*��Z�"�m[���N�rдb�(fp�������4��8���-�\L�!�%���㮮p�fz*R݁�_�[�*֕�%�cSqB�~�����`���	����I�b�HS���H�;PaP0�.d��4��}2��`T(8f�	(&3�j�mΙ^Jdv�31:���#B0"e�@��+&��0=_?�,����P������|"&�}\'ˆ������o,:Dh���h ���yz"��˓xx��&�	n�.g��>PO���&�x��#-p�ˢZroA7X���;q�5�p�����X!�5M~:{(�BM�ʸɵC��M�]qĿ��:iP'�B[ҧg�c8 �W��K�G"C֘�-��y�(±&8<��Y���`�*�Bս?��G��~�6�O��0%oZeS�ز0g�"b�>��JO�J�j���GÕ�ڏ���!����pĢ�Ib0��_=���-���ц��XQin'������R�(X����E�ih�F��Cer\j��C�:�7�X�揙��c�呣�	/�(�c,�(빼�o�1�h*F�g�[���]��[�5X-�3�(X]�^�G�j�SmVE��+��L~����������a�*۶�8v2������mn{�+�ϻ��g_��^����߿w�t�O$�	�4�o�����8I?�T�[�nZ���>qK�p(���}q��1E&t<��P�f��R�o�EA��nqX���Ƕ8��i&��!�Zfb�����(n>����$��������w�>��k�H2�<I��i�B��'f#(���n���vb�R��.�Ҡ�������pR
���?�C���jI0����������/e�3�!�|�5Z����f�g?�;�r(��f2�ΛZ>�@�φS�a�~�͇�-NF��0��j��cQ6 ��E�}8 �ތ$�o��iq~����B��[���^���'�����3�%x��ޫ�̍��A�%Ӊ3�
�M�5�b��N0^�a���ft4M~[8��{އ[��-�+�E.�cQ
A�'i�u{ƽZ�l�� �vN�S�X#����/0��a	��0�k�՞9=�9.�ur^L8o�[l�q�������<��g
*��e�/K/h�V�8vu�ld�[Mcy.*��g F�l�V��q�S)!t����=J4�u�ec���5��vIm-L�]v�z�P$�Wŧ�YJ7��PO�d�4�y>V+x�p&b�������7����Ff.�=П>^�]�v�ZɅוNl�����ʾc�ƻ=R�N1H�^wĤ
�󟩴'k|K���),�xى��Sp�g���	����	lu�n
-u�k��0>�%���Fc8���B�Up�HH�PD�LG������z��)_Z��-�m�v�cl�����������Q؆� �1��M�8��S��|%�ɗ�۹�nns�;���ؼ�I�_I8"�Bptq��Ǫ�$����	��ٻ��9�V�-�+��N�A,:�˭�����H���՟�W�aN�G්s.:P�D(7��r(ȥ�w��ľ�+�;������S߫4�Z���-�XI��������K�ϫ/�����|�Yf�W�>�u��;L̹8k_�N/��aל��rј^��>8��Υ��~J���\���e�`;*-/�{��x�;����m{܉b��y��Mх��l_h���ĕ`�Q�nS!�A$���Iݣ}!8�2fϿ����`K�6x3�:��\B's��)��LĐ��7n%����"`Q7��%Vx��N�Ou��c�֝
�R�@�����l�����{��n��C�rC�r�j][�}��(y��
@��>@���[{��DxFE�&3�.�}8L͛�D�|(�_ye�EEU�`jvy�m��Ys��aL\T�:#���w�B���Č����t{s}Ko|s���=i�4X��O�`� %+�
j�=9��+>�/|%���v醿��0��_��#v+��B@��&�J)��.�/:2�Q.�[�� ��.B��+Ȉ��/��xA��������H�瓉^E����f�"��E�&��0)n�;8�T(�͗XD|����c}��U��.]�|C<\L=���xy���ᕴN2�
�PJ����$e���M��̞��[�=�`@'ƞ���JfQ�#d� �:ā�~M�C�E�kK}��F v:���ҟ�5��^еl��/_������Q�$O�����G�v���=��()t#'̆緂F��[�%�.�ח45�ډɆ>掾�`?�/�W�Z�fЉ�|�M�N4RD��Cc����A��Z*���ؔ��~�>����h��x�+����p��UXQ�7(Q/.U��"˲/?UŶ�TR�.*) �?@p�ÿ'���T����,�'LKI������p��s��tCp��Z��Hkߊ�E���V��w�=eyk�PJ�Vn�<�d�	X��]�-��;�!�a&ĕ�Q#�(Tn�pV�(���7Y ���z�;��58��Y|�͒��E �6�h�/z`�ݦ��& ����c�u/�d�Rn%��`��|��1&�xሌ�E��Qm\�%X�(No�E��6?�2`��tXbq�q��'�<NZZ�����_���E"=2A���0��<��Py5E����>>��ٌ��e��oTvݪ&������NY\UAq�lM-�G�D�9I0���^�|w'?�Jh�Rs1��N���ç���06�[m�f�֮#߃Η��	��!��|�{��
�M�F˜�=�)�b��]$��>+6�R���fJHmʽ��N�~�e,���"0�kj�)V���p�g����hG�k��jt!�@�P��^�"qp�"!��S��M�w�KW�������Z�9^���K�HU��D�",� ����p��~E��i�˚<Қ�+���ᘍ]J=�A&ģIK��G��W}�T�X7���QDdВd�k���I�DN��I���>�B]��jﺭv'n�����Z��9_����3�RWnzrp�7e��(d��-����x��G���w��E�v(
'�	�ᰛ�P�I0N���N�Q���С֫�7�ݧF�n6\T�񸩫�.{�h��>BΈ���~�����x-1X�����0&���Ż��Ϟ��sm(���&PG*4�aI n�ǘ�w�\u�5IF�.�T��Ń
��BB0]�@���w.˞-�C���Q�P�;���h�(j��3��pv�=RJ-�gv'���n��M����n[z* �
  �Ϣҁ&-T-�!��{�9顦�O�I�E�<&t:�i	0 �n^�R��m�>��yn[
��I8|:��s���,��p���֮7bv"�|��p��_!�l��/�έ��TO�V���׮���nܲ�Vs������~"���o~���/������t�w���c��$J}���hD�e���8Zu��U�  _؈�5�h����C�f��:*�0���F�=4lu���,���ᡎ}v0�[�%sj8G��E�P���@�3GOQiN8��P�&/���iY�KWe�媲Z�JA�z`��	�Ѹ�"�F���~�^�罢 X7���j�9D%Lh!s@)&��iZH����ޑp�6����u��-D��+��د�1�z����e�?p�����P����2�`@cرQI�IU���4����Q�e���t�Ғ��܁����E�6�	<�٭r� �Vǥ�.��X>R�0�R��B��r^�
��7T�aд/�0޿��*��2����ݮ=�o|�\q#-R�-�;��J��"�����j���z!�$(�~'V ��OB	u+5�X-%�/8b���#�ou�x'�RW�4%����gx�g�(�5��+@bS����f��>EC��0I����*I�/�[�z��&;&A�M+;G�l'��&�>�#��N�*?������ô������9��.�����4CL�;�on�z�5���>X��K�m�阚Q#"K8�!뎥���@��L�,Y�
na�E�{tH��r�U�,=5�rW�:SY`U��Y]���� ��K�׻��\�g��"w��&�0�H	>�֣Hϵ��V�LF�m`w���l�Ѥ�(�/��W�������=�0O�.+e>����?�,%�d��ȳ�C�f֬�^,�W���0�X_��7ip�{ͬc�;&_r=U^L j٥Ik-_7/���RL��r�/T��s���xFo���4.���cGŴ)[����:��EQ���{�h����JvNDe
�?T�%�.��~Atq��*��-���H����+�(�5�#�Y�Q"����g�7 C'Uh�������p��\t��D	)��y�EqPݍ�ӂ���`�N�bWpo�y���DR�6�W_l'y�s�ޝ����OM�.A��Rpѻ֜�����s������o#���x2�
��^��҇R�����g�,��)/����=�i������ͫ��U����C�O�c��̘���HS�-w`���}��^�?�����NH��,K��$'�]5ڟx}���1��-N����0�� �+/e����#O��'���ww�����p�t�zn�}}���ݍ���k^��s������ޘ�mu��ψeJFe��'��L��/)����R���nP��x���X��}�D&�`�5���|��8�S6��P87�>���Ǜ�dἽ�����Z8�o>^�޿�yOX� |�i �����~�W�_��_�!_N�{J�7���W��x���1m$Y�X�B�W���0�;�*n����wՙ�_6�t��貐ḛ�I�.��fqb!D� ��٩M�b�f�!�q�at�]�z��⥭��~�b;D/u��_H�[W��h�ҳ�7@.n��ⱸ¼�B�$��h��p��P\J}3'�<ip�Ed��ۗ�2�*�$[{KKPj���8Y�<�p�I�ؼk`fkp��]�TQ
Le&tn��q�-�^��ԥ+DH58,O���KNp�Ze� [N��\�����z�}�z���ۼ9��.����?������ ���=%������sU:#E��w�Sx�s���M"��|��[)���@I�9x�͠DQ�&s��
�- r�.䎌R�"y1'j�H�f%�a�tF���̖�=�;���O+�x�^J�����T�>�������ܫ s�hxhIx�'��Tz^���T�G����E�@ ��p?�`ۿ��%vԻ�`j~��* d�p��2���r,Q��Zc�[��=�g��C�PpoQ�ל-���{���7��[��q޻��$�	�S���+G�&�0�l���Y7��x�g���F��'�	n��o��)w�����~����Ku;�.�컟��?���{�㻹��������sl�������[o~����[ ����������",���b�Vz�����Hwt,J8���9�di��>A�`� }���Izs|��S���;�7�
轃;)r{q=�_��W �/ϕ��;'�֠�\�ؾ���m�|Cy�.^) t�؊s������2�����<�akx�)8�����C�^��S�%
�X��N������?�T�^<����3��4,���jp E���0��>�XSH*2x���p�j�ߛj 8�װ���G8Vwx���6�֍��Uy8��P�����/�Y��~���r�(�jk����
]GJ܁Q��Z��+}�T�mG�៊{w��T���d�S�/9�3jl;����Ud΂��(\�g���n��O�taZJ�V���C%_��t�s�!����Pf*8|�×��������7R��
�`���G-u%o�A�^_���R��{�Q%F�f(�_�_�__�͊��}��}�œ�%�[�ߑ��Q���w�@��5š�X�[�˲��v�      d   �   x��л
B1��}���)Iz���Y]��B�A|{sF���O�A���k+�t=�����"'�	Ha�`39m��I+���ykg��G]�6�ag­Ħ���ޖC_Z�O|v^�����$^0�N�;C��8�=;C{-�|oP
      f   4   x�3�4B���JNCC.#N#$��)�1�g�e�i�0��P�΍���� 4B      b   �  x�%��q1���� ��(�8܃����$�O��c~���9��](�l*��&4���6��t�.t��D��	�j�±ڱp�v,��j�±ڱp�v��7/���:��:�S����/������;�|aM|]��/R�rDj^f��eEj^�H���y�#5/O��卼������E}�#j�gT�WT�Ϩ��������'��(ͫ�y�y��<kjG55�����1M�㐦�qDS�8 ·o����'_p6��=�s�Wp*��	}'B��y�Op�K�֋�y���y{�ּ��5oWl��3���[����y��ּ}c��b?���|�#�P�8�^qJ}ƙ�+�R�q���s�o�;/���/���W�n�ռ[q5�θ�wW\ͻ;���W�.�?(�<�W��}�����G����R����7�W<y;�V?�4��x��x�5o|z��&�o4���#�U�7�x̿����xBx�;�)��|j�V���w��w����D
�)^�/0&�?���c6�#g"�6ڡ��v(l���h���pd;R!n�b�v���9d#!���C��M��ӄ�4��G�@RM�Ȥ_e��F;&Մ��A8�&�J5�vLm��}āj�F"���Մ�T���6�!Ҫ�M�H��a#!��p�v�	�iQ��p�v�I�D�j�q�Al�&WO	���iDs�)jDD�1��Fm�k�E���2b{��&ʈ��F�(#�gɢ�؞m�2jݷ-?m������t��}b��3H����4r��F� �I�5�<	�	(!����ꊱ�P對T對X對\對`對d對h對l�M�YڦM�bu���FlYFl9��HU#6bՈ�\5b#X��H��hQFleᢌ�Dm#^�[�F�(#����QFle!��ظ�oK�Cʈm�Q��4b�fl���؈���Wd#6nI!�$eĶl㶤�ؖmܙ�Q�	�qsRFl�6�Oʈm��ڠ���C��X��v��i���h�{�6bc{4b�׈��!d�PFl�6Ve�vlc�PFl�6�eԋ�m,ʈ���*��شK���%�]"Ħ]"Ħ]"Ħ]"Ħ]"Ħ]"ԛ�5b�.�k6�!�g�$�m�|��K���.�g�$�m�|��K�����׶����y��.�`��v���>�!o~�%B^��K���i�y�.��]"��.�%�]"��m���Kj��.�a���m���Kj��.�a���m�J��%�"�?@g�J      Z   �   x�]�K
�0D��)tCh�m���ݨA��ud��۷��@�����Z6�`Z�*�Z�)����(�B�]LR���8�֓�U��.b���o>���(��9�����vOk��m���,�n\�:�8J�����7B�      l   B   x�3�,I-.Q0�4202�54�54P0��2��2��352�)nf�	Ԅ&md T�ga�n\�+F��� J��      \   C  x���KN�0����s����E$�V�f�f���Q�؎�rzK�
e�K���&�3�7gK��TXԎ��P���(ZciM 1H�u�?[�A���XS�
��?�r5�Ew�m��nɋ2WsXqc�	Wdh����]�{Ϣ�����g={kG��X؃�v'����B�C���F���*�T�Z���yf1;|$/�ȉ��W�r�:	���p�{��b������H3���ⴸ�@��-C�8����#�Ë�C�*��G�6-�ɳ�(�n��vs3��|��w\ي���Fn�W+&����am]CZ��3�p]�=��)�����,      X   �  x��YY����}����p�n|l�z�(�(��7��y~���Oi����C�F�2w�ʕ��r;�=�O��q�e>��n&�8��6��z�	�fo*s��Y�h>P&�F
�mF�3F��CƇ�L�!� �R3���Y��	�C���.��d�}:�nH�Wiϣ�I�������o0�#��O0��M�I(Q�E�(�����hV��JQ���W�@� &�Tt�����zD��'
����!ת�z�D����V[4��{���Y�{�P���0�?0�op꾰�s.Vn��ܞ�m*���r��^�}�C�aD��'1K��M��%I�4��bvn�����弧�J���A�Nq�����o�9��� o�� �OrEI�1�w�0�Lc�`EyJv)ٛ����GƠ����pt�zB`��pjф�%�̉Rg�G��P4�֙�Eˮ�t��⫀��V���0��{�����/�o�5��������,�4q	`�Jk_;ޜO�!Dܯ�?�O�� �AG�y�)���,kέ8i��E�fO �;��0��Afy�ڱ��N��ٿ��d����j���L��1��k(,T��D���2F�kWN��������g(�%��Z|@��\�FVe?�m�&��>8�D,�h
�����
<Ca���1�1c�#�D�:k��$!��ۡ�&�{�P��@�z\�E������sV]ٲ�[�{9�"s-$7}�o �� !�#*�
���G/ls��p��I���IḄ؉N*RL���b}�"&Xȯ��u��+�xd5~���g*��d�W���`a�2*3�߱�	�k��#:����$�M�q�q���H�U�)��ߥ�&X�TaK.a\�����r[��+�F�b�oa�#���2\�)��=�\e�UdY�~�JeP\%,�8��c��,��X���G&ZUW|a�:�����vD2OX��� >��D3�_CYF���3�i��i���%S�\m��}��?�� yot��M'�*6�fe5�S�A�]��ƈ`]A�X��A������0y�o@�������w��ml-�vz�f,{/
Hg-TY�E�I��:2�ng���9�����H||>#���M�Y����`!eR��k���~��[3�S��{���h���N����	��^a	12�7�n��AM"�g�LT�l��s��w
!#����o�#�͒PW.�չ��[nB��5iz������£?��H��޳���x��uȴ��;a\?�������ݙ�3(�_��0>�e���;~ol4��P?xP�BB~O�d�)T��.�^X͆��.|�J����p,U�N��b�U����v���Ȼ*��<ڇ�2���\�y2|����v��g��Œ*�Qϵl�V<꒭m|f�S&�/#	^���L����f����?�f�.��$J;C8ȅb/y�jB1H/�"��L��=Cz�Ɔ��ms��a�)���š6�øt���󎆡���8�Z_�ie�*��S� ��⿏�c�w���|r{�񉏡]`�*t�*,�����*���5����O��~4D��x#�~����|!kM��Q���e����7���حச�.�6�(]�A�Yp�VB�2}�/j�쓹��sa�[x��w.Gg�ݛ�!~D��[.����^��RJ�W��ھ�M��Aɓy/
V)ԹIS�#Xzr%�aG�|k����JJ��r��dT��tBG��\*J������UD�d��D���9�+�E�����f^����B%��?�/�ϵ�� �AuY"$�Iw)����]��B�emB�ņA;.!�%���~~��*A%_�I�׾*�����z�BF�-���A�|>ZDg�s4��%�� ��U}_Z���T�*�難����X��}�DF�e��=xZ���:���.���K�|Be��c �B�����j�X��E`��a��j���w��},��
���D��J�u���	y߯p�/�e�0w<�S�od��#�l�M��W�摔l��\�ia�נ�%hJe�
�C�_��k�Q��B�79E6��r����Z**q]W��'��ƍgAb�y��
�n�i�n����Ӭ|�~�Z����BS�7���"+qj�Y�$����
���r��xG�c�/��}N�Hpp}%]�C�ɵ�/0j�ۗ�Z���.iި��W�D$��]ٟ~2J�9cBޗ��3�^�|���.��k�ʭQ5,Rr���([���R�gc��H�Q	�t6,�xI
=^�ߩ�/Iԫ�żq";��r"�3E��z�͐��'f;�6���o�o�{�Z ^Q�A�]��0��Q�����o���k���C	���̵�](�:��Ⱦ��*^
 yEu�+tv�|�ن�:I�|�A�z�vz��}�BݦY��p���u��]��,�?�;�Q�r[�I[40�t�//>_39(7b������|Xwء=2����I������%N�>��r�E�� rn�m�*��"B�� �мS$�؉��;�σt$��q>M9��)���!����2�1��.4��-�KC�d�X����ʽ���-��~s���-�+ln��_�����K�_�;:ԍqc	S��-w	TU���;�0B�Z�[]�a��A��}�e򔬺���v�cI���2O��\��P���&���,�6O֎�ң�.��$y {+L<�<65� �[o��&/����A͔��/K�RɃ���p]Z��!��@�<s�i��[�,��=�X�_����W#�ƈEO5nb5�3��v��u�
�SG6l�.V���}�J	��|��_���Ň'�Y][dӝ�Y ���J���Df�^�ʵq����^~݊��6e���c�[$_��U�˼���� ��!��Pi�󋴥��+�>�"������׾%�F
u׉��u�����l�$=N<$&�T�֦�K�6���q1"3z��-7��W�e�_c�2��j���v}����f�E`�W-w�V��ʧ&��a&��iς�2�/��$\�D}�\�ʊh�:�����e�.�덳p@�4��**��:�2��G��w��H�/2M|�s؄l��m�n+�����^)Z`sKW��.��\Z��)'��_��(D�./:MLu�+.{^v���Pi��j�P��v��gS���$'7�I�E(@>4�2>��@�A��8 �趕��1.-����dBm���6�&��(���u9xI��R����$��� F_�GEY��g7؋�����}���5�?�9����y�H�HF���r�L�"���h2�2׵CV����)��{a��2ƿ�/��d�[�I�f��K����} 	��&g�$�g���m��&]��M������eRJ      j      x�3�4�43������ 
��      n      x������ � �      V   �  x��W�r9��<E^�.� H�qO�U*~��9�7V6{���#+��զ֕*Od���n4x���SHeP/1t����I����g��''�Xg�M�-j�y�cw��G��<����>u�l��ܥ�(P
�>G�Or�v�j��鯔��D�?<N�s�����r�������'p�����H��E5�)-H�=T�- !_�z;��u�bɌ��_�mz-��ƮqX_��ٴ�\)u2<l�s(�|�tOt/v�s)�#�L$����?ܗDK~�^��TDB��A���r�!熣�Yڮh[���a�Ȩw�8Z\�+�R�4aku�JT�5����z��U䔋�UO��Hu���?��ǧ����+ Z�܅�Z�+d�#���Dl*I�2��#����Yω��8� I��24�g4	hb델;')5*��z}+��gT�=�;3f�JĚ����O��?~� ��j������BI�Pя�j�h����}�4�3���:��:J�����`GP���gn�v��R�⌬�~Q���c�����}SA�������ߏ>o��� ����1y�Pa�T �>B�5C�L>�[����Y��n��֙�`��2cK<2�*�m��@,��0�|��Ui����Ҏ�v��'O�Ҕ��[��z���ъ9:�"�	��S�b��R���m��;�:k�F��^Zː8�{�ޜ,qK�\��ۘ�֌:oVQ�D�kD����:D���m�����~���xBz8i{D랞�WHk�3����4�L�`�8��2��2s밵�L�I�n��Į�=���!�52�OJ�嫏��RD݊P�'���&�h�/�q����_!\�����Y�}v���G���sy�(@@ہ�,P��K3L�}���5���0~89�w�҈��l��ɶ$�6+M�n1��R���vSid��Zi�':�T��2�t���I9G�~X�aȬ{Ieϔ����n�8�$�j�a���ʈE��`���lt�-D:�6��"�ef��{��s��+s9��7P����'R��7k��������?l���o�h���`G.��jS�0r�\C7I�s��e�:$���e�C��V�6�lml��]�bf6p]_VnV��|ELb���0�=��I����ϑ[+�BZp�5��-X�22M^k��殀^>zJ���jx��:'F���iX���K���ܫ�qRؑ#ު��9���B*T�U}����$�.����7t[�?����M�M�W�K8�0m`4cNؤ��:V6�@��T١�� ��B�p��J�^ڊ8�Ms�c�f����Hn���C�v-4��?=o(���� �������O�M���t�Jd�:N4�[�Dm#�ZB����擅��֦I1���Y�5+P��i�Ιa�Ѫ�M��zWya�t��>����+�r�4{��}=<��M����|��0�rhd1 ,m.����4�V䉴�KZ�ED=X$�����p]PF���C�k���ںYE�n� 3���������>Ƴ/RiC�8xx;L,t�xH���!;:H4��U��s�8�II�K��
�2f�A�"g�V.U\me���n��\�덢�A�5���q��s���C�tp5�PH
�AR5�M�� �aEB�K�h1�AӺ8QN�x��h�|��0	��B�$r�V��;����`0�0����/�����-M���x~3�$��g`-W��w h�����r����N ��coM�5є����l�FT�@&ŝ��>��gT�r$4��跫�Z�.����� �WpuH�-��<d�BΈ�=��"6@n?�Q��]�ejs�ZV.s�)4q6��L��
<����;���Mu��w����}ڈ&��;H8;��:�������+���bA�}"�4�^��<���vѹC���,4�@0�����i��},�K�7�[A1��mX��=YnW�4��	��	I���b��l�O��}������"     